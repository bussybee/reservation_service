package ru.vsu.cs.maslova_e_i.util.mapper;

import org.mapstruct.*;
import ru.vsu.cs.maslova_e_i.dto.CourseDTO;
import ru.vsu.cs.maslova_e_i.model.Course;

@Mapper(componentModel = "spring")
public interface CourseMapper {
    @Mapping(target = "institution", ignore = true)
    Course toEntity(CourseDTO userDTO);

    @Mapping(target = "institutionId", source = "institution.id")
    CourseDTO toDto(Course user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCourseFromDto(CourseDTO dto, @MappingTarget Course course);
}
