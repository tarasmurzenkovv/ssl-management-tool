package com.syngenta.rnd.certificate.management.service.polling;

import lombok.SneakyThrows;
import org.shredzone.acme4j.Order;
import org.shredzone.acme4j.Status;
import org.springframework.stereotype.Service;

@Service
public class OrderPollingStrategy implements PollingStrategy<Order> {

    @Override
    @SneakyThrows
    public void doPoll(Order pollableEntity) {
        int attempts = 10;
        while (pollableEntity.getStatus() != Status.VALID && attempts-- > 0) {
            if (pollableEntity.getStatus() == Status.INVALID) {
                throw new RuntimeException("Order failed... Giving up.");
            }
            Thread.sleep(3000L);
            pollableEntity.update();
        }
    }
}
