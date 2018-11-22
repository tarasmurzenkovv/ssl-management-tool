package com.syngenta.rnd.certificate.management.dao;

import com.syngenta.rnd.certificate.management.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    @Query("select user from  UserEntity  user where user.userName=:userName")
    Optional<UserEntity> findByUserName(@Param("userName") String userName);
}
