package com.syngenta.rnd.certificate.management.controller;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.jayway.restassured.RestAssured;
import com.jayway.restassured.http.ContentType;
import com.jayway.restassured.specification.RequestSpecification;
import com.syngenta.rnd.certificate.management.CertificateManagementServiceMain;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockitoTestExecutionListener;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = CertificateManagementServiceMain.class, webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class, DbUnitTestExecutionListener.class, MockitoTestExecutionListener.class})
public class BaseIntegrationTest {
    @Value("${server.port}")
    protected int definedPort;

    RequestSpecification getPreConfiguredRestAssured() {
        return RestAssured
                .given()
                .port(this.definedPort)
                .contentType(ContentType.JSON);
    }
}
