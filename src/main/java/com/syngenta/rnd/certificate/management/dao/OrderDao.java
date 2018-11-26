package com.syngenta.rnd.certificate.management.dao;

import com.syngenta.rnd.certificate.management.model.domain.OrderWithDomains;
import com.syngenta.rnd.certificate.management.model.domain.StorageKey;
import org.shredzone.acme4j.Order;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OrderDao {
    private final Map<StorageKey, OrderWithDomains> map = new ConcurrentHashMap<>();

    public OrderWithDomains getOrderWithDomains(String userName, Collection<String> domains) {
        StorageKey storageKey = new StorageKey(userName, domains);
        return map.get(storageKey);
    }

    public void persistOrder(String userName, Set<String> domains, Order order) {
        StorageKey storageKey = new StorageKey(userName, domains);
        OrderWithDomains orderWithDomains = new OrderWithDomains(order, domains);
        map.put(storageKey, orderWithDomains);
    }
}
