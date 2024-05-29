package ru.vsu.cs.maslova_e_i.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationRequest {
    String emailOrPhone;
    String password;
}