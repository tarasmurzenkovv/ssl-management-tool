package com.syngenta.rnd.certificate.management.controller.test.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;

import java.io.File;
import java.net.URL;

public class JsonUtils {

    @SneakyThrows
    public static <T> T readFromJson(String pathToJson, Class<T> tClass) {
        ObjectMapper objectMapper = new ObjectMapper();
        URL resource = JsonUtils.class.getResource(pathToJson);
        return objectMapper.readValue(new File(resource.getPath()), tClass);
    }
}
