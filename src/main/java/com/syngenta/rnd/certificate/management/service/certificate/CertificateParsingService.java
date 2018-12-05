package com.syngenta.rnd.certificate.management.service.certificate;

import com.syngenta.rnd.certificate.management.model.domain.CertificateMetaInformation;
import lombok.SneakyThrows;
import org.shredzone.acme4j.Certificate;
import org.shredzone.acme4j.toolbox.AcmeUtils;
import org.springframework.stereotype.Service;

import javax.security.auth.x500.X500Principal;
import java.io.CharArrayWriter;
import java.security.cert.X509Certificate;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CertificateParsingService {

    private static final String CERTIFICATE_NAME_PREFIX = "CN=";
    private static final String EMPTY_STRING = "";

    @SneakyThrows
    public List<CertificateMetaInformation> parseCertificate(Certificate certificate) {
        return Optional.ofNullable(certificate)
                .map(Certificate::getCertificateChain)
                .orElseGet(Collections::emptyList)
                .stream()
                .map(CertificateParsingService::toMetaInformation)
                .collect(Collectors.toList());
    }

    private static CertificateMetaInformation toMetaInformation(X509Certificate certificate) {
        LocalDate expirationDate = extractCertificateExpirationDate(certificate);
        LocalDate issuedDate = extractCertificateIssuedDate(certificate);
        String principleDomain = extractPrincipleDomainName(certificate);
        String certificateBody = extractCertificateBody(certificate);
        return CertificateMetaInformation.builder()
                .certificateBody(certificateBody)
                .principleDomain(principleDomain)
                .dateOfExpiration(expirationDate)
                .dateOfIssue(issuedDate)
                .build();
    }

    private static String extractPrincipleDomainName(X509Certificate x509Certificate) {
        X500Principal subjectX500Principal = x509Certificate.getSubjectX500Principal();
        String name = subjectX500Principal.getName();
        return name.replace(CERTIFICATE_NAME_PREFIX, EMPTY_STRING);
    }

    private static LocalDate extractCertificateExpirationDate(X509Certificate x509Certificate) {
        Date notAfter = x509Certificate.getNotBefore();
        return LocalDate.ofInstant(notAfter.toInstant(), ZoneId.systemDefault());
    }

    private static LocalDate extractCertificateIssuedDate(X509Certificate x509Certificate) {
        Date notBefore = x509Certificate.getNotAfter();
        return LocalDate.ofInstant(notBefore.toInstant(), ZoneId.systemDefault());
    }

    @SneakyThrows
    private static String extractCertificateBody(X509Certificate x509Certificate) {
        try (CharArrayWriter writer = new CharArrayWriter()) {
            AcmeUtils.writeToPem(x509Certificate.getEncoded(), AcmeUtils.PemLabel.CERTIFICATE, writer);
            return new String(writer.toCharArray());
        }
    }
}
