package com.syngenta.rnd.certificate.management.service.certificate;

import com.syngenta.rnd.certificate.management.dao.OrderDao;
import com.syngenta.rnd.certificate.management.service.authorization.AuthorizationService;
import com.syngenta.rnd.certificate.management.service.order.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.shredzone.acme4j.Certificate;
import org.shredzone.acme4j.Order;
import org.springframework.stereotype.Service;

import java.io.CharArrayWriter;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CertificateService {
    private final AuthorizationService authorizationService;
    private final OrderService orderService;
    private final OrderDao orderDao;

    public String getCertificate(String userName, Set<String> domains) {
        OrderDao.OrderWithDomains orderWithDomains = orderDao.getOrder(userName, domains);
        Order order = orderWithDomains.getOrder();
        authorizationService.authorize(order.getAuthorizations());
        orderService.pollOrder(order, domains);
        return Optional.ofNullable(order.getCertificate())
                .map(CertificateService::getCertificateAsString)
                .orElseThrow(() -> new RuntimeException("Cannot fetch certificate from order"));
    }

    @SneakyThrows
    private static String getCertificateAsString(Certificate certificate) {
        try (CharArrayWriter writer = new CharArrayWriter()) {
            certificate.writeCertificate(writer);
            return new String(writer.toCharArray());
        }
    }
}
