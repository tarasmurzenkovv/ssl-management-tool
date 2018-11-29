package com.syngenta.rnd.certificate.management.controller;

import com.syngenta.rnd.certificate.management.model.domain.CertificateMetaInformation;
import com.syngenta.rnd.certificate.management.model.dto.ChallengeInformation;
import com.syngenta.rnd.certificate.management.model.dto.ChallengeRequest;
import com.syngenta.rnd.certificate.management.service.authorization.ChallengeService;
import com.syngenta.rnd.certificate.management.service.certificate.CertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController("/certificate")
@RequiredArgsConstructor
public class CertificateController {
    private final ChallengeService challengeService;
    private final CertificateService certificateService;

    @PostMapping("/challenge")
    public List<ChallengeInformation> createChallenge(@RequestBody ChallengeRequest createChallengeRequest) {
        return challengeService.createChallenge(createChallengeRequest);
    }

    @PostMapping
    public List<CertificateMetaInformation> createCertificates(@RequestParam("userName") String userName,
                                                               @RequestParam("domains") Set<String> domains) {
        return certificateService.createCertificates(userName, domains);
    }

    @GetMapping
    public List<CertificateMetaInformation> findCertificates(@RequestParam("userName") String userName,
                                                             @RequestParam(value = "domains", required = false) Set<String> domains) {
        return CollectionUtils.isEmpty(domains)
                ? certificateService.findAllCertificatesForUserName(userName)
                : certificateService.findCertificates(userName, domains);
    }

    @PutMapping
    public void renewCertificates(@RequestParam("userName") String userName,
                                  @RequestParam("domains") Set<String> domains) {
        certificateService.renewCertificates(userName, domains);
    }
}
