package com.syngenta.rnd.certificate.management.service.polling;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.shredzone.acme4j.Status;
import org.shredzone.acme4j.challenge.Challenge;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class ChallengePollingStrategy implements PollingStrategy<Challenge> {
    private final ExecutorService executorService;

    @Override
    @SneakyThrows
    public void doPoll(Challenge challenge) {
        AtomicInteger attempts = new AtomicInteger(10);
        challenge.trigger();
        executorService.submit(() -> action(challenge, attempts));
    }

    @SneakyThrows
    private static void action(Challenge challenge, AtomicInteger attempts) {
        while (!ChallengePollingStrategy.isChallengeValid(challenge) && attempts.decrementAndGet() > 0) {
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
