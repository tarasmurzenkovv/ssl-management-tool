package com.syngenta.rnd.certificate.management.model.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Base64;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "jwt.token")
public class JwtSecurityConfigurationHolder {
    private String key;
    private int expireLength;

    public String getKeyEncodedAsBase64() {
        return Base64.getEncoder().encodeToString(key.getBytes());
    }
}
