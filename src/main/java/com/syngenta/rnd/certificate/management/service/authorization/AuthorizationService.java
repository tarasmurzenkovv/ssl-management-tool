package com.syngenta.rnd.certificate.management.service.authorization;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.shredzone.acme4j.Authorization;
import org.shredzone.acme4j.Status;
import org.shredzone.acme4j.challenge.Challenge;
import org.shredzone.acme4j.challenge.Http01Challenge;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthorizationService {
    private final ChallengeService challengeService;

    public void authorize(List<Authorization> authorizations) {
        authorizations.forEach(this::authorize);
    }

    private void authorize(Authorization auth) {
        log.info("Authorization for domain {}", auth.getIdentifier().getDomain());
        Challenge challenge = Optional.ofNullable(auth.findChallenge(Http01Challenge.TYPE))
                .map(Http01Challenge.class::cast)
                .orElseThrow(() -> new RuntimeException("No challenge is found"));

        if (auth.getStatus() == Status.VALID || challenge.getStatus() == Status.VALID) {
            return;
        }
        challengeService.pollChallenge(challenge);
        log.info("Challenge has been completed. Remember to remove the validation resource.");
    }
}
