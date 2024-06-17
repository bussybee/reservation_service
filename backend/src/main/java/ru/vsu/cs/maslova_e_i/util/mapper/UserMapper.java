package ru.vsu.cs.maslova_e_i.util.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import ru.vsu.cs.maslova_e_i.dto.InstitutionDTO;
import ru.vsu.cs.maslova_e_i.dto.UserDTO;
import ru.vsu.cs.maslova_e_i.model.Institution;
import ru.vsu.cs.maslova_e_i.model.User;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR, uses = {InstitutionMapper.class})
public interface UserMapper {

    @Mapping(target = "role", constant = "USER")
    User toUser(UserDTO userDTO);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "favorites", source = "favorites", qualifiedByName = "mapFavorites")
    @Mapping(target = "role", source = "role")
    UserDTO toDto(User user);

    @Named("mapFavorites")
    default Set<InstitutionDTO> mapFavorites(Set<Institution> institutions) {
        if (institutions != null) {
            InstitutionMapper institutionMapper = Mappers.getMapper(InstitutionMapper.class);
            return institutions.stream().map(institutionMapper::toDto).collect(Collectors.toSet());
        } else {
            return Collections.EMPTY_SET;
        }
    }
}
