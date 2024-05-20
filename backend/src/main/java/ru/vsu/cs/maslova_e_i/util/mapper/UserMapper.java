package ru.vsu.cs.maslova_e_i.util.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.vsu.cs.maslova_e_i.dto.UserDTO;
import ru.vsu.cs.maslova_e_i.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "role", constant = "USER")
    User toUser(UserDTO userDTO);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", source = "role")
    UserDTO toDto(User user);
}
