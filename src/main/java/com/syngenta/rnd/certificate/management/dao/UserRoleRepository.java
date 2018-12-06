package com.syngenta.rnd.certificate.management.dao;

import com.syngenta.rnd.certificate.management.model.entity.UserRoleEntity;
import com.syngenta.rnd.certificate.management.model.security.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRoleRepository extends JpaRepository<UserRoleEntity, Long> {
    UserRoleEntity findByUserRole(UserRole userRole);
}
