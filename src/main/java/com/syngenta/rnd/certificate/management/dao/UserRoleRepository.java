package com.syngenta.rnd.certificate.management.dao;

import com.syngenta.rnd.certificate.management.model.entity.UserRoleEntity;
import com.syngenta.rnd.certificate.management.model.security.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRoleEntity, Long> {

    default Optional<UserRoleEntity> findByUserRole(String userRoleAsString) {
        UserRole userRole = UserRole.valueOf(userRoleAsString);
        return findByUserRole(userRole);
    }

    Optional<UserRoleEntity> findByUserRole(UserRole userRole);
}
