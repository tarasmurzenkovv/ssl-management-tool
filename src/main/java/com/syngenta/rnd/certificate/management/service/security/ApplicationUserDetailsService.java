package com.syngenta.rnd.certificate.management.service.security;

import com.syngenta.rnd.certificate.management.dao.UserRepository;
import com.syngenta.rnd.certificate.management.model.security.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ApplicationUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        return userRepository
                .findByUserName(username)
                .map(userEntity -> User.withUsername(userEntity.getUserName())
                        .authorities(UserRole.ROLE_ADMIN.name())
                        .password(userEntity.getUserPassword())
                        .build())
                .orElseThrow(() -> new RuntimeException("Cannot find user for the given user name " + username));
    }
}
