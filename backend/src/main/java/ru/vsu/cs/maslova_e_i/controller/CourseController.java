package ru.vsu.cs.maslova_e_i.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
@CrossOrigin(origins = "*")
public class CourseController {

    CourseService service;

    @GetMapping("/{id}")
    @Operation(summary = "Получить услугу по id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Услуга найдена",
                    content = @Content(schema = @Schema(implementation = CourseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Услуга не найдена")
    })
    public ResponseEntity<CourseDTO> getCourseById(@PathVariable Long id) {
        return new ResponseEntity<>(service.getCourseById(id), HttpStatus.OK);
    }

    @PostMapping
    @Operation(summary = "Создать новую услугу")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Услуга успешно создана",
                    content = @Content(schema = @Schema(implementation = CourseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Неверные данные запроса")
    })
    public ResponseEntity<CourseDTO> createCourse(@RequestBody CourseDTO courseDTO) {
        return new ResponseEntity<>(service.createCourse(courseDTO), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Получить список всех услуг")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Список услуг успешно получен",
                    content = @Content(schema = @Schema(implementation = CourseDTO.class))),
            @ApiResponse(responseCode = "204", description = "Список курсов пуст")
    })
    public ResponseEntity<List<CourseDTO>> getAll() {
        return new ResponseEntity<>(service.getCourses(), HttpStatus.OK);
    }

    @GetMapping("/institution/{id}")
    @Operation(summary = "Получить услугу по id учреждения")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Список услуг успешно получен",
                    content = @Content(schema = @Schema(implementation = CourseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Учреждение не найдено")
    })
    public ResponseEntity<List<CourseDTO>> getCoursesByInstitutionId(@PathVariable Long id) {
        return new ResponseEntity<>(service.getCoursesByInstitution(id), HttpStatus.OK);
    }
}
