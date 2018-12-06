package com.syngenta.rnd.certificate.management.model.entity;

import com.syngenta.rnd.certificate.management.model.security.UserRole;
import com.syngenta.rnd.certificate.management.service.persistence.UserRoleConverter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "application_user_role")
@NoArgsConstructor
public class UserRoleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role_name")
    @Convert(converter = UserRoleConverter.class)
    private UserRole userRole;
}
