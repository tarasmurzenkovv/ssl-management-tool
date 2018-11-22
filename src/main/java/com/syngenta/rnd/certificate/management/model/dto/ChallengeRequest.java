package com.syngenta.rnd.certificate.management.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class ChallengeRequest {
    private String userName;
    private Set<String> domains;
}
