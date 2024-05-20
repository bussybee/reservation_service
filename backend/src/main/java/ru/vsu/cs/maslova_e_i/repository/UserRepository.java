package ru.vsu.cs.maslova_e_i.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.vsu.cs.maslova_e_i.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE (:email is null or email =:email) OR (:phoneNumber is null or phoneNumber =:phoneNumber)")
    Optional<User> findByEmailOrPhoneNumber(@Param("email") String email, @Param("phoneNumber") String phoneNumber);

    Boolean existsByEmailOrPhoneNumber(String email, String phoneNumber);
}