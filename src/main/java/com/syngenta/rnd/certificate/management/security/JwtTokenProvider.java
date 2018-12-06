package com.syngenta.rnd.certificate.management.security;

import com.syngenta.rnd.certificate.management.exceptions.TokenExpiredException;
import com.syngenta.rnd.certificate.management.model.security.JwtSecurityConfigurationHolder;
import com.syngenta.rnd.certificate.management.model.security.UserRole;
import com.syngenta.rnd.certificate.management.service.security.ApplicationUserDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JwtTokenProvider {

    private final JwtSecurityConfigurationHolder securityConfigurationHolder;
    private final ApplicationUserDetailsService applicationUserDetailsService;

    public String createToken(String username, List<UserRole> roles) {
        int expireLength = securityConfigurationHolder.getExpireLength();
        String keyEncodedAsBase64 = securityConfigurationHolder.getKeyEncodedAsBase64();
        Claims claims = Jwts.claims().setSubject(username);
        claims.put("auth", roles.stream().map(s -> new SimpleGrantedAuthority(s.getAuthority())).collect(Collectors.toList()));

        Date now = new Date();
        Date validity = new Date(now.getTime() + expireLength);

        return Jwts.builder()//
                .setClaims(claims)//
                .setIssuedAt(now)//
                .setExpiration(validity)//
                .signWith(SignatureAlgorithm.HS256, keyEncodedAsBase64)//
                .compact();
    }

    Authentication getAuthentication(String token) {
        UserDetails userDetails = applicationUserDetailsService.loadUserByUsername(getUsername(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    private String getUsername(String token) {
        String keyEncodedAsBase64 = securityConfigurationHolder.getKeyEncodedAsBase64();
        return Jwts.parser().setSigningKey(keyEncodedAsBase64).parseClaimsJws(token).getBody().getSubject();
    }

    String resolveToken(HttpServletRequest req) {
        String bearerTokenHeaderName = req.getHeader("Authorization");
        String bearerTokeHeaderValuePrefix = "Bearer ";
        if (bearerTokenHeaderName != null && bearerTokenHeaderName.startsWith(bearerTokeHeaderValuePrefix)) {
            return bearerTokenHeaderName.substring(bearerTokeHeaderValuePrefix.length());
        }
        return null;
    }

    boolean validateToken(String token) {
        try {
            String keyEncodedAsBase64 = securityConfigurationHolder.getKeyEncodedAsBase64();
            Jwts.parser().setSigningKey(keyEncodedAsBase64).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            throw new TokenExpiredException("Expired or invalid JWT token " + HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
