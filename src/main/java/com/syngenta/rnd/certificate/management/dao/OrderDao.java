package com.syngenta.rnd.certificate.management.dao;

import lombok.Data;
import org.shredzone.acme4j.Order;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OrderDao {
    private final Map<StorageKey, OrderWithDomains> map = new ConcurrentHashMap<>();

    public OrderWithDomains getOrder(String userName, Collection<String> domains) {
        StorageKey storageKey = new StorageKey(userName, domains);
        return map.get(storageKey);
    }

    public void persistOrder(String userName, Set<String> domains, Order order) {
        StorageKey storageKey = new StorageKey(userName, domains);
        OrderWithDomains orderWithDomains = new OrderWithDomains(order, domains);
        map.put(storageKey, orderWithDomains);
    }

    @Data
    private static class StorageKey {
        private final String userName;
        private final Collection<String> domains;
    }

    @Data
    public static class OrderWithDomains {
        private final Order order;
        private final Set<String> domains;
    }
}
