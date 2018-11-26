package com.syngenta.rnd.certificate.management.model.domain;

import lombok.Data;
import org.shredzone.acme4j.Order;

import java.util.Set;

@Data
public class OrderWithDomains {
    private final Order order;
    private final Set<String> domains;
}
