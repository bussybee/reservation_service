package ru.vsu.cs.maslova_e_i.util.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.vsu.cs.maslova_e_i.dto.CourseDTO;
import ru.vsu.cs.maslova_e_i.model.Course;

@Mapper(componentModel = "spring")
public interface CourseMapper {
    @Mapping(target = "institution", ignore = true)
    Course toEntity(CourseDTO userDTO);

    @Mapping(target = "institutionId", source = "institution.id")
    CourseDTO toDto(Course user);
}
