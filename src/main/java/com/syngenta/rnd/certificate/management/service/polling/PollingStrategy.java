package com.syngenta.rnd.certificate.management.service.polling;

public interface PollingStrategy<T> {
    void doPoll(T pollableEntity);
}
