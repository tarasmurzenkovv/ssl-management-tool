package com.syngenta.rnd.certificate.management.service.authorization;

import com.syngenta.rnd.certificate.management.model.dto.ChallengeInformation;
import com.syngenta.rnd.certificate.management.model.dto.ChallengeRequest;
import com.syngenta.rnd.certificate.management.service.account.AccountService;
import com.syngenta.rnd.certificate.management.service.order.OrderService;
import com.syngenta.rnd.certificate.management.service.polling.PollingStrategy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.shredzone.acme4j.Account;
import org.shredzone.acme4j.Authorization;
import org.shredzone.acme4j.Order;
import org.shredzone.acme4j.challenge.Challenge;
import org.shredzone.acme4j.challenge.Http01Challenge;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChallengeService {
    private final PollingStrategy<Challenge> pollingStrategy;
    private final OrderService orderService;
    private final AccountService accountService;

    public List<ChallengeInformation> createNewChallenge(ChallengeRequest createChallengeRequest) {
        String userName = createChallengeRequest.getUserName();
        Set<String> domains = createChallengeRequest.getDomains();
        Account account = accountService.initializeLetsEncryptAccount(userName);
        Order order = orderService.createOrder(userName, account, domains);
        return ChallengeService.buildChallengeInformation(order);
    }

    public void pollChallenge(Challenge challenge) {
        pollingStrategy.doPoll(challenge);
    }

    private static List<ChallengeInformation> buildChallengeInformation(Order order) {
        return order.getAuthorizations()
                .stream()
                .map(ChallengeService::buildChallengeInformation)
                .collect(Collectors.toList());
    }

    private static ChallengeInformation buildChallengeInformation(Authorization auth) {
        return Optional.ofNullable(auth.findChallenge(Http01Challenge.TYPE))
                .map(ch -> (Http01Challenge) ch)
                .map(ch -> toChallengeInformation(auth, ch))
                .orElseThrow();
    }

    private static ChallengeInformation toChallengeInformation(Authorization auth, Http01Challenge challenge) {
        ChallengeInformation challengeInformation = new ChallengeInformation();
        challengeInformation.setChallenge(challenge);
        challengeInformation.setHost(String.format("http://%s/.well-known/acme-challenge/%s",
                auth.getIdentifier().getDomain(), challenge.getToken()));
        challengeInformation.setFileName(challenge.getToken());
        challengeInformation.setContent(challenge.getAuthorization());
        return challengeInformation;
    }
}
