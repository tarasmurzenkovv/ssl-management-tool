package com.syngenta.rnd.certificate.management.dao;

import com.syngenta.rnd.certificate.management.model.domain.CertificateMetaInformation;
import com.syngenta.rnd.certificate.management.model.entity.CertificateRecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.DoubleStream;
import java.util.stream.Stream;

public interface CertificateRecordRepository extends JpaRepository<CertificateRecordEntity, Long> {

    @Query(" select certificate from CertificateRecordEntity certificate " +
            "where certificate.userEntity.userName=:userName and certificate.id=:certificateId")
    Optional<CertificateRecordEntity> findCertificateByUserNameAndCertificateId(@Param("userName") String userName,
                                                                                @Param("certificateId") Long certificateId);

    @Query(" select certificate from CertificateRecordEntity certificate " +
            "where certificate.userEntity.userName=:userName ")
    Stream<CertificateRecordEntity> findAllCertificatesForUserName(@Param("userName") String userName);

    @Query(" select certificate from CertificateRecordEntity certificate " +
            "where certificate.userEntity.userName=:userName and certificate.domain in :domains ")
    Stream<CertificateRecordEntity> findAllCertificatesForUserNameAndDomains(@Param("userName") String userName,
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

    @Modifying
    @Query("delete from CertificateRecordEntity certificate " +
            "where certificate.id=:certificateId and certificate.userEntity.userName=:userName")
    void deleteCertificate(@Param("userName") String userName,
                           @Param("certificateId") Long certificateId);
}
