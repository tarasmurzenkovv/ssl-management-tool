package com.syngenta.rnd.certificate.management.service.persistence;

import com.syngenta.rnd.certificate.management.model.security.UserRole;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class UserRoleConverter implements AttributeConverter<UserRole, String> {
    @Override
    public String convertToDatabaseColumn(UserRole attribute) {
        return attribute.name();
    }

    @Override
    public UserRole convertToEntityAttribute(String dbData) {
        return UserRole.valueOf(dbData);
    }
}
