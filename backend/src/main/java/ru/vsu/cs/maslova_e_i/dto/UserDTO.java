package ru.vsu.cs.maslova_e_i.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import ru.vsu.cs.maslova_e_i.util.Gender;

@Data
public class UserDTO {
    private Long userId;
    @Email
    private String email;
    @NotBlank
    @Size(min = 6, max = 12)
    private String password;
    private String lastName;
    private String firstName;
    private Integer age;
    private Gender gender;
    @Size(min = 11, max = 12)
    private String phoneNumber;
}
