package com.syngenta.rnd.certificate.management.controller;

import com.syngenta.rnd.certificate.management.model.dto.UserRegistrationRequest;
import com.syngenta.rnd.certificate.management.service.account.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserRegisterationController {
    private final AccountService accountService;

    @PostMapping("/registration")
    public Long registerUser(@RequestBody UserRegistrationRequest userRegistrationRequest) {
        return accountService.saveUserInformation(userRegistrationRequest);
    }
}
