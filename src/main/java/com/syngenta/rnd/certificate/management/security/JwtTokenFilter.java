package com.syngenta.rnd.certificate.management.security;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
@RequiredArgsConstructor
public class JwtTokenFilter extends GenericFilterBean {
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    @SneakyThrows
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain) {
        try {
            String token = JwtTokenFilter.resolveToken((HttpServletRequest) req);
            if (token != null && jwtTokenProvider.validateToken(token)) {
                Authentication auth = jwtTokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        } catch (RuntimeException ex) {
            HttpServletResponse response = (HttpServletResponse) res;
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getOutputStream().write(ex.getMessage().getBytes());
            return;
        }

        filterChain.doFilter(req, res);
    }

    private static String resolveToken(HttpServletRequest req) {
        String bearerTokenHeaderName = req.getHeader("Authorization");
        String bearerTokeHeaderValuePrefix = "Bearer ";
        if (bearerTokenHeaderName != null && bearerTokenHeaderName.startsWith(bearerTokeHeaderValuePrefix)) {
            return bearerTokenHeaderName.substring(bearerTokeHeaderValuePrefix.length());
        }
        return null;
    }
}
