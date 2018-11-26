package com.syngenta.rnd.certificate.management.model.domain;

import lombok.Data;

import java.util.Collection;

@Data
public class StorageKey {
    private final String userName;
    private final Collection<String> domains;
}
