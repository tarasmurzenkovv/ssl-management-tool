package com.syngenta.rnd.certificate.management.model.security;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
    ADMIN, CLIENT;

    @Override
    public String getAuthority() {
        return name();
    }
}
