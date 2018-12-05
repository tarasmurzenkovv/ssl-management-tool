package com.syngenta.rnd.certificate.management.service.account;

import com.syngenta.rnd.certificate.management.dao.UserRepository;
import com.syngenta.rnd.certificate.management.model.dto.UserRegistrationRequest;
import com.syngenta.rnd.certificate.management.model.entity.UserEntity;
import com.syngenta.rnd.certificate.management.service.keypair.KeyPairService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.shredzone.acme4j.Account;
import org.shredzone.acme4j.AccountBuilder;
import org.shredzone.acme4j.Session;

import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.ByteArrayOutputStream;
import java.security.KeyPair;

@Slf4j
@Service
@RequiredArgsConstructor
public class AccountService {
    private final KeyPairService keyPairService;
    private final UserRepository userRepository;

    @Transactional
    public Long saveUserInformation(UserRegistrationRequest userRegistrationRequest) {
        String userName = userRegistrationRequest.getUserName();
        ByteArrayOutputStream keyPairOutPutStream = keyPairService.createKeyPairAsByteOutputStream();
        UserEntity userEntity = createUserEntity(userName, keyPairOutPutStream);
        return userRepository.save(userEntity).getId();
    }

    public Account initializeLetsEncryptAccount(String userName) {
        return userRepository.findByUserName(userName)
                .map(this::toLetsEncryptAccount)
                .orElseThrow(() -> new RuntimeException(String.format("Cannot find registered user for user name %s", userName)));
    }

    @SneakyThrows
    private Account toLetsEncryptAccount(UserEntity userEntity) {
        KeyPair keyPair = keyPairService.loadKeyPair(userEntity.getKeyPair());
        Session session = new Session("acme://letsencrypt.org/staging");
        Account account = createAccount(keyPair, session);
        log.info("Registered a new user, URL: {}", account.getLocation());
        return account;
    }

    @SneakyThrows
    private Account createAccount(KeyPair keyPair, Session session) {
        return new AccountBuilder()
                .agreeToTermsOfService()
                .useKeyPair(keyPair)
                .create(session);
    }

    private static UserEntity createUserEntity(String userName, ByteArrayOutputStream byteArrayOutputStream) {
        String keyPairAsString = new String(byteArrayOutputStream.toByteArray());
        UserEntity userEntity = new UserEntity();
        userEntity.setUserName(userName);
        userEntity.setKeyPair(keyPairAsString);
        return userEntity;
    }

    public void checkIfUserExists(UserRegistrationRequest userRegistrationRequest) {
        userRepository.findByUserName(userRegistrationRequest.getUserName())
                .orElseThrow(() -> new RuntimeException("Cannot find user"));
    }
}
