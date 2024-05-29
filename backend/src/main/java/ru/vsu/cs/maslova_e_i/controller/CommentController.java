package ru.vsu.cs.maslova_e_i.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.vsu.cs.maslova_e_i.dto.CommentDTO;
import ru.vsu.cs.maslova_e_i.service.CommentService;
import ru.vsu.cs.maslova_e_i.util.InstitutionType;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/comments")
public class CommentController {
    CommentService service;

    @GetMapping("/fitness")
    @Operation(summary = "Получить все отзывы для фитнес-центров")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Список отзывов успешно получен")
    })
    public ResponseEntity<List<CommentDTO>> getAllCommentsForFitness() {
        return new ResponseEntity<>(service.getCommentsByInstitutionType(InstitutionType.FITNESS), HttpStatus.OK);
    }

    @GetMapping("/beautySalons")
    @Operation(summary = "Получить все отзывы для салонов красоты")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Список отзывов успешно получен")
    })
    public ResponseEntity<List<CommentDTO>> getAllCommentsForBeautySalon() {
        return new ResponseEntity<>(service.getCommentsByInstitutionType(InstitutionType.BEAUTY_SALON), HttpStatus.OK);
    }

    @GetMapping("/spaCenters")
    @Operation(summary = "Получить все отзывы для спа-центров")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Список отзывов успешно получен")
    })
    public ResponseEntity<List<CommentDTO>> getAllCommentsForSpaCenter() {
        return new ResponseEntity<>(service.getCommentsByInstitutionType(InstitutionType.SPA_SALON), HttpStatus.OK);
    }
}
