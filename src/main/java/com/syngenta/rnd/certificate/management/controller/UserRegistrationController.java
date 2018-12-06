package com.syngenta.rnd.certificate.management.controller;

import com.syngenta.rnd.certificate.management.model.dto.UserRegistrationRequest;
import com.syngenta.rnd.certificate.management.service.account.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserRegistrationController {
    private final AccountService accountService;

    @PostMapping("/registration")
    public String registerUser(@RequestBody UserRegistrationRequest userRegistrationRequest) {
        return accountService.saveUserInformation(userRegistrationRequest);
    }

    @PostMapping("/login")
    public String login(@RequestBody UserRegistrationRequest userRegistrationRequest) {
        return accountService.loginUser(userRegistrationRequest);
    }
}
