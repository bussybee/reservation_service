package ru.vsu.cs.maslova_e_i.util.mapper;

import org.mapstruct.Mapper;
import ru.vsu.cs.maslova_e_i.dto.InstitutionDTO;
import ru.vsu.cs.maslova_e_i.model.Institution;

@Mapper(componentModel = "spring")
public interface InstitutionMapper {

    Institution toEntity(InstitutionDTO userDTO);

    InstitutionDTO toDto(Institution user);
}
