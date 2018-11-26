package com.syngenta.rnd.certificate.management.converter;

import com.syngenta.rnd.certificate.management.model.domain.CertificateMetaInformation;
import com.syngenta.rnd.certificate.management.model.entity.CertificateRecordEntity;
import com.syngenta.rnd.certificate.management.model.entity.UserEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CertificateConverter {

    public List<CertificateRecordEntity> toCertificateRecordEntities(List<CertificateMetaInformation> parsedCertificates,
                                                                     UserEntity userEntity) {
        return parsedCertificates
                .stream()
                .map(meta -> CertificateConverter.toCertificateRecordEntity(meta, userEntity))
                .collect(Collectors.toList());
    }

    private static CertificateRecordEntity toCertificateRecordEntity(CertificateMetaInformation meta, UserEntity userEntity) {
        CertificateRecordEntity certificateRecordEntity = new CertificateRecordEntity();
        certificateRecordEntity.setUserEntity(userEntity);
        certificateRecordEntity.setCertificate(meta.getCertificateBody());
        certificateRecordEntity.setValidTill(meta.getDateOfExpiration());
        certificateRecordEntity.setIssuedDate(meta.getDateOfIssue());
        certificateRecordEntity.setDomain(meta.getPrincipleDomain());
        return certificateRecordEntity;
    }

    public CertificateMetaInformation toCertificateMetaInformation(CertificateRecordEntity certificateRecordEntity) {
        return CertificateMetaInformation.builder()
                .dateOfIssue(certificateRecordEntity.getIssuedDate())
                .dateOfExpiration(certificateRecordEntity.getValidTill())
                .principleDomain(certificateRecordEntity.getDomain())
                .certificateBody(certificateRecordEntity.getCertificate())
                .build();
    }
}
