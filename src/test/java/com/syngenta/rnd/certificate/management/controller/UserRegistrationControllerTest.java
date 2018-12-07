package com.syngenta.rnd.certificate.management.controller;

import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import com.jayway.restassured.RestAssured;
import com.jayway.restassured.http.ContentType;
import com.syngenta.rnd.certificate.management.controller.test.utils.JsonUtils;
import com.syngenta.rnd.certificate.management.model.dto.UserRegistrationRequest;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.MockitoTestExecutionListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@TestExecutionListeners({DbUnitTestExecutionListener.class, MockitoTestExecutionListener.class})
public class UserRegistrationControllerTest {

    @Before
    public void setUp() {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = 8080;
    }

    @MockBean
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Test
    @DatabaseSetup("/registrationControllerTestResources/userRoleDbSetup.xml")
    @DatabaseTearDown("/registrationControllerTestResources/dbTearDown.xml")
    public void shouldSuccessfullyRegisterNewUser() {
        RestAssured
                .given()
                .body(JsonUtils.readFromJson("/registrationControllerTestResources/registrationRequest.json", UserRegistrationRequest.class))
                .contentType(ContentType.JSON)
                .post("/registration")
                .then()
                .statusCode(200);
    }

    @Ignore
    @Test
    @DatabaseSetup("/registrationControllerTestResources/userRoleDbSetup.xml")
    @DatabaseSetup("/registrationControllerTestResources/registeredUserDbSetup.xml")
    @DatabaseTearDown("/registrationControllerTestResources/dbTearDown.xml")
    public void shouldSuccessfullyLoginTheExistingUser() {
        Mockito.when(bCryptPasswordEncoder.encode(Mockito.anyString())).thenReturn("qwerty100$");
        RestAssured
                .given()
                .body(JsonUtils.readFromJson("/registrationControllerTestResources/registrationRequest.json", UserRegistrationRequest.class))
                .contentType(ContentType.JSON)
                .post("/login")
                .then()
                .statusCode(200);
    }
}
