package com.syngenta.rnd.certificate.management.service.keypair;

import lombok.SneakyThrows;
import org.shredzone.acme4j.util.KeyPairUtils;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.Writer;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.InputStream;
import java.io.Reader;
import java.security.KeyPair;

@Service
public class KeyPairService {
    private static final int RSA_GENERATED_KEY_PAIR_SIZE = 2048;

    @SneakyThrows
    public ByteArrayOutputStream createKeyPairAsByteOutputStream() {
        try (Writer writer = new OutputStreamWriter(new ByteArrayOutputStream())) {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            KeyPair keyPair = KeyPairUtils.createKeyPair(RSA_GENERATED_KEY_PAIR_SIZE);
            KeyPairUtils.writeKeyPair(keyPair, writer);
            return byteArrayOutputStream;
        }
    }

    public KeyPair createKeyPair() {
        return KeyPairUtils.createKeyPair(RSA_GENERATED_KEY_PAIR_SIZE);
    }

    public KeyPair loadKeyPair(String keyPairAsString) {
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(keyPairAsString.getBytes());
        return loadKeyPair(byteArrayInputStream);
    }

    @SneakyThrows
    private static KeyPair loadKeyPair(InputStream fileWithKeyPair) {
        try (Reader reader = new InputStreamReader(fileWithKeyPair)) {
            return KeyPairUtils.readKeyPair(reader);
        }
    }
}
