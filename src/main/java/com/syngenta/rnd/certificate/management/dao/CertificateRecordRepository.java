package com.syngenta.rnd.certificate.management.dao;

import com.syngenta.rnd.certificate.management.model.domain.CertificateMetaInformation;
import com.syngenta.rnd.certificate.management.model.entity.CertificateRecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface CertificateRecordRepository extends JpaRepository<CertificateRecordEntity, Long> {

    @Query(" select certificate from CertificateRecordEntity certificate " +
            "where certificate.userEntity.userName=:userName and certificate.domain in :domains ")
    List<CertificateRecordEntity> findAllCertificatesForUserNameAndDomains(@Param("userName") String userName,
                                                                           @Param("domains") Set<String> domains);

    default void updateCertificate(CertificateMetaInformation certificateMetaInformation, Long userId) {
        String certificateBody = certificateMetaInformation.getCertificateBody();
        LocalDate dateOfIssue = certificateMetaInformation.getDateOfIssue();
        LocalDate dateOfExpiration = certificateMetaInformation.getDateOfExpiration();
        String principleDomain = certificateMetaInformation.getPrincipleDomain();
        updateCertificate(certificateBody, dateOfIssue, dateOfExpiration, principleDomain, userId);
    }

    @Modifying
    @Query(" update CertificateRecordEntity certificate " +
            " set certificate.certificate=:certificateBody, " +
            " certificate.issuedDate=:issuedDate, " +
            " certificate.validTill=:validTill " +
            " where certificate.domain=:domain and certificate.userEntity.id=:userId ")
    void updateCertificate(@Param("certificateBody") String certificateBody,
                           @Param("issuedDate") LocalDate issuedDate,
                           @Param("validTill") LocalDate validTill,
                           @Param("domain") String domain,
                           @Param("userId") Long userId);

}
