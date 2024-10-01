package ru.vsu.cs.maslova_e_i.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import ru.vsu.cs.maslova_e_i.util.Gender;
import ru.vsu.cs.maslova_e_i.util.Role;

import java.util.Set;

@Entity
@Data
@Table(name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email")
        })
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 12)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String lastName;
    private String firstName;
    private Integer age;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String phoneNumber;
    String image;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "favorites", joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "institution_id"))
    private Set<Institution> favorites;
}