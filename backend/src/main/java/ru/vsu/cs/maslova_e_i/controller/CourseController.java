package ru.vsu.cs.maslova_e_i.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.vsu.cs.maslova_e_i.dto.CourseDTO;
import ru.vsu.cs.maslova_e_i.service.CourseService;

import java.util.List;

@RestController
@RequestMapping("course")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CourseController {

    CourseService service;

    @GetMapping("/{id}")
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable Long id) {
        return new ResponseEntity<>(service.getCourseById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CourseDTO> createCourse(@RequestBody CourseDTO courseDTO) {
        return new ResponseEntity<>(service.createCourse(courseDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CourseDTO>> getAll() {
        return new ResponseEntity<>(service.getCourses(), HttpStatus.OK);
    }

    @GetMapping("/institution/{id}")
    public ResponseEntity<List<CourseDTO>> getCoursesByInstitutionId(@PathVariable Long id) {
        return new ResponseEntity<>(service.getCoursesByInstitution(id), HttpStatus.OK);
    }
}
