package com.syngenta.rnd.certificate.management.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String userName) {
        super(String.format("Cannot find registered user for the provided user name + '%s'", userName));
    }
}
