package com.syngenta.rnd.certificate.management.model.domain;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class CertificateMetaInformation {
    private final String certificateBody;
    private final String principleDomain;
    private final LocalDate dateOfIssue;
    private final LocalDate dateOfExpiration;
}
