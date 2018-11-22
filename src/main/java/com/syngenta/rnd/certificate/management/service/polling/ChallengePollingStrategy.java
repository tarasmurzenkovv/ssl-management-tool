package com.syngenta.rnd.certificate.management.service.polling;

import lombok.SneakyThrows;
import org.shredzone.acme4j.Status;
import org.shredzone.acme4j.challenge.Challenge;
import org.springframework.stereotype.Service;

@Service
public class ChallengePollingStrategy implements PollingStrategy<Challenge> {

    @Override
    @SneakyThrows
    public void doPoll(Challenge challenge) {
        int attempts = 10;
        challenge.trigger();
        while (!ChallengePollingStrategy.isChallengeValid(challenge) && attempts-- > 0) {
            if (ChallengePollingStrategy.isChallengedInvalid(challenge)) {
                throw new RuntimeException("Challenge failed... Giving up.");
            }
            Thread.sleep(3000L);
            challenge.update();
        }
    }

    private static boolean isChallengedInvalid(Challenge challenge) {
        return challenge.getStatus() == Status.INVALID;
    }

    private static boolean isChallengeValid(Challenge challenge) {
        return challenge.getStatus() == Status.VALID;
    }
}
