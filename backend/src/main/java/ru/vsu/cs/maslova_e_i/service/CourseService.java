package ru.vsu.cs.maslova_e_i.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Service;
import ru.vsu.cs.maslova_e_i.dto.CourseDTO;
import ru.vsu.cs.maslova_e_i.repository.CourseRepository;
import ru.vsu.cs.maslova_e_i.util.mapper.CourseMapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CourseService {

    CourseRepository repository;
    CourseMapper mapper;

    public CourseDTO createCourse(CourseDTO courseDTO) {
        return mapper.toDto(repository.save(mapper.toEntity(courseDTO)));
    }

    public CourseDTO getCourseById(Long courseId) {
        return mapper.toDto(repository.findById(courseId).orElseThrow(() -> new ObjectNotFoundException("Course", courseId)));
    }

    public List<CourseDTO> getCourses() {
        return repository.findAll().stream().map(mapper::toDto).collect(Collectors.toList());
    }

    public List<CourseDTO> getCoursesByInstitution(Long institutionId) {
        return repository.findAllByInstitutionId(institutionId).stream().map(mapper::toDto).collect(Collectors.toList());
    }
}
