package ru.vsu.cs.maslova_e_i.util.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.vsu.cs.maslova_e_i.dto.UserDTO;
import ru.vsu.cs.maslova_e_i.model.User;

import java.util.Base64;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "phoneNumber", expression = "java(normalizePhoneNumber(userDTO.phoneNumber))")
    @Mapping(target = "password", expression = "java(encodePassword(userDTO.password))")
    User toUser(UserDTO userDTO);

    @Mapping(target = "password", ignore = true)
    UserDTO toDto(User user);

    default String normalizePhoneNumber(String phoneNumber) {
        return phoneNumber.replaceAll("^(\\+?[78])", "");
    }

    default String encodePassword(String password) {
        return Base64.getEncoder().encodeToString(password.getBytes());
    }
}
