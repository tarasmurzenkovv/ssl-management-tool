package com.syngenta.rnd.certificate.management.service.security;

import com.syngenta.rnd.certificate.management.model.dto.UserRegistrationRequest;
import com.syngenta.rnd.certificate.management.model.security.UserRole;
import com.syngenta.rnd.certificate.management.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JWTAuthenticationService {
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public String generateTokenForLogin(UserRegistrationRequest userRegistrationRequest) {
        String userName = userRegistrationRequest.getUserName();
        String password = userRegistrationRequest.getPassword();
        UserRole userRole = UserRole.valueOf(userRegistrationRequest.getUserRole());
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, password));
        return jwtTokenProvider.createToken(userName, List.of(userRole));
    }

    public String generateTokenForRegister(UserRegistrationRequest userRegistrationRequest) {
        String userName = userRegistrationRequest.getUserName();
        UserRole userRole = UserRole.valueOf(userRegistrationRequest.getUserRole());
        return jwtTokenProvider.createToken(userName, List.of(userRole));
    }
}
