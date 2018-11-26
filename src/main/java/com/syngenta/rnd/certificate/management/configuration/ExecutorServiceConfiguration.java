package com.syngenta.rnd.certificate.management.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Configuration
public class ExecutorServiceConfiguration {
    @Bean
    public ExecutorService threadPoolExecutor() {
        return Executors.newCachedThreadPool();
    }
}
