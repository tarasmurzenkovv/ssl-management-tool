package com.syngenta.rnd.certificate.management.controller;

import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import com.syngenta.rnd.certificate.management.controller.test.utils.JsonUtils;
import com.syngenta.rnd.certificate.management.model.dto.UserRegistrationRequest;
import org.apache.http.HttpStatus;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

@DatabaseSetup("/registrationControllerTestResources/userRoleDbSetup.xml")
@DatabaseTearDown("/registrationControllerTestResources/dbTearDown.xml")
public class UserRegistrationControllerTest extends BaseIntegrationTest {

    @MockBean
    private PasswordEncoder bCryptPasswordEncoder;

    @Test
    public void shouldSuccessfullyRegisterNewUser() {
        this.getPreConfiguredRestAssured()
                .body(JsonUtils.readFromJson("/registrationControllerTestResources/registrationRequest.json", UserRegistrationRequest.class))
                .post("/registration")
                .then()
                .statusCode(200);
    }

    @Test
    @DatabaseSetup("/registrationControllerTestResources/registeredUserDbSetup.xml")
    public void shouldSuccessfullyLoginTheExistingUser() {
        Mockito.when(bCryptPasswordEncoder.encode(Mockito.anyString())).thenReturn("qwerty100$");
        Mockito.when(bCryptPasswordEncoder.matches(Mockito.anyString(), Mockito.anyString())).thenReturn(Boolean.TRUE);
        this.getPreConfiguredRestAssured()
                .body(JsonUtils.readFromJson("/registrationControllerTestResources/registrationRequest.json", UserRegistrationRequest.class))
                .post("/login")
                .then()
                .statusCode(200);
    }

    @Test
    public void shouldReturnNotFoundHttpStatusForAbsentInDbUserName() {
        Mockito.when(bCryptPasswordEncoder.encode(Mockito.anyString())).thenReturn("qwerty100$");
        Mockito.when(bCryptPasswordEncoder.matches(Mockito.anyString(), Mockito.anyString())).thenReturn(Boolean.TRUE);
        this.getPreConfiguredRestAssured()
                .body(JsonUtils.readFromJson("/registrationControllerTestResources/registrationRequestWithUnknownUserName.json",
                        UserRegistrationRequest.class))
                .post("/login")
                .then()
                .statusCode(HttpStatus.SC_NOT_FOUND);
    }
}
