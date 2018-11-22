package com.syngenta.rnd.certificate.management.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.shredzone.acme4j.challenge.Challenge;

@Getter
@Setter
public class ChallengeInformation {
    @JsonIgnore
    private Challenge challenge;
    private String host;
    private String fileName;
    private String content;
}
