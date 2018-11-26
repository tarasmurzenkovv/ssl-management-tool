package com.syngenta.rnd.certificate.management.service.polling;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.shredzone.acme4j.Order;
import org.shredzone.acme4j.Status;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class OrderPollingStrategy implements PollingStrategy<Order> {
    private final ExecutorService executorService;

    @Override
    public void doPoll(Order pollableEntity) {
        AtomicInteger attempts = new AtomicInteger(10);
        executorService.submit(() -> action(pollableEntity, attempts));
    }

    @SneakyThrows
    private void action(Order pollableEntity, AtomicInteger attempts) {
        while (pollableEntity.getStatus() != Status.VALID && attempts.decrementAndGet() > 0) {
            if (pollableEntity.getStatus() == Status.INVALID) {
                throw new RuntimeException("Order failed... Giving up.");
            }
            Thread.sleep(3000L);
            pollableEntity.update();
        }
    }
}
