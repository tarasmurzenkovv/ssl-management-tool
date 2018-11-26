package com.syngenta.rnd.certificate.management.service.certificate;

import com.syngenta.rnd.certificate.management.converter.CertificateConverter;
import com.syngenta.rnd.certificate.management.dao.CertificateRecordRepository;
import com.syngenta.rnd.certificate.management.dao.OrderDao;
import com.syngenta.rnd.certificate.management.dao.UserRepository;
import com.syngenta.rnd.certificate.management.model.domain.CertificateMetaInformation;
import com.syngenta.rnd.certificate.management.model.domain.OrderWithDomains;
import com.syngenta.rnd.certificate.management.model.entity.CertificateRecordEntity;
import com.syngenta.rnd.certificate.management.model.entity.UserEntity;
import com.syngenta.rnd.certificate.management.service.authorization.AuthorizationService;
import com.syngenta.rnd.certificate.management.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import org.shredzone.acme4j.Certificate;
import org.shredzone.acme4j.Order;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CertificateService {
    private final AuthorizationService authorizationService;
    private final OrderService orderService;
    private final UserRepository userRepository;
    private final CertificateRecordRepository certificateRecordRepository;
    private final CertificateParsingService certificateParsingService;
    private final CertificateConverter certificateConverter;
    private final OrderDao orderDao;

    @Transactional
    public List<CertificateMetaInformation> createCertificates(String userName, Set<String> domains) {
        Order order = authorizeAndPollOrder(userName, domains);
        return parseAndSaveCertificates(userName, order);
    }

    @Transactional
    public void renewCertificates(String userName, Set<String> domains) {
        Order order = authorizeAndPollOrder(userName, domains);
        parseAndUpdateCertificates(userName, order);
    }

    public List<CertificateMetaInformation> findCertificates(String userName, Set<String> domains) {
        return certificateRecordRepository.findAllCertificatesForUserNameAndDomains(userName, domains)
                .stream()
                .map(certificateConverter::toCertificateMetaInformation)
                .collect(Collectors.toList());
    }

    private List<CertificateMetaInformation> parseAndSaveCertificates(String userName, Order order) {
        Certificate certificate = order.getCertificate();
        UserEntity userEntity = userRepository.findByUserNameOrElseThrowException(userName);
        List<CertificateMetaInformation> parsedCertificates = certificateParsingService.parseCertificate(certificate);
        List<CertificateRecordEntity> entities = certificateConverter.toCertificateRecordEntities(parsedCertificates, userEntity);
        certificateRecordRepository.saveAll(entities);
        return parsedCertificates;
    }

    private void parseAndUpdateCertificates(String userName, Order order) {
        Certificate certificate = order.getCertificate();
        UserEntity userEntity = userRepository.findByUserNameOrElseThrowException(userName);
        certificateParsingService.parseCertificate(certificate)
                .forEach(certificateMeta -> certificateRecordRepository.updateCertificate(certificateMeta, userEntity.getId()));
    }

    private Order authorizeAndPollOrder(String userName, Set<String> domains) {
        OrderWithDomains orderWithDomains = Optional.ofNullable(orderDao.getOrderWithDomains(userName, domains))
                .orElseThrow(() -> new RuntimeException(
                        String.format("The challenge is not triggered for the provide userName %s and domains %s. Cannot perform update of the certificates. ",
                                userName, domains)));
        Order order = orderWithDomains.getOrder();
        authorizationService.authorize(order.getAuthorizations());
        orderService.pollOrder(order, domains);
        return order;
    }
}
