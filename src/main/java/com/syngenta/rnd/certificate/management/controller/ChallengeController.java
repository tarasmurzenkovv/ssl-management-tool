package com.syngenta.rnd.certificate.management.controller;

import com.syngenta.rnd.certificate.management.model.dto.ChallengeInformation;
import com.syngenta.rnd.certificate.management.model.dto.ChallengeRequest;
import com.syngenta.rnd.certificate.management.service.authorization.ChallengeService;
import com.syngenta.rnd.certificate.management.service.certificate.CertificateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
public class ChallengeController {
    private final ChallengeService challengeService;
    private final CertificateService certificateService;

    @PostMapping("/challenge")
    public List<ChallengeInformation> createNewChallenge(@RequestBody ChallengeRequest createChallengeRequest) {
        return challengeService.createNewChallenge(createChallengeRequest);
    }

    @GetMapping("/certificate")
    public String getCertificate(@RequestParam("userName") String userName, @RequestParam("domains") Set<String> domains) {
        return certificateService.getCertificate(userName, domains);
    }
}
