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
import ru.vsu.cs.maslova_e_i.dto.FeedbackDTO;
import ru.vsu.cs.maslova_e_i.service.FeedbackService;

import java.util.List;

@RestController
@RequestMapping("feedback")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class FeedbackController {

    FeedbackService feedbackService;

    @GetMapping("/{id}")
    @Operation(summary = "Получить информацию об обратной связи по id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Успешно найдена",
            content = @Content(schema = @Schema(implementation = FeedbackDTO.class))),
            @ApiResponse(responseCode = "404", description = "Информация не найдена")
    })
    public ResponseEntity<FeedbackDTO> getFeedbackById(@PathVariable Long id) {
        return new ResponseEntity<>(feedbackService.getFeedbackById(id), HttpStatus.OK);
    }

    @PostMapping
    @Operation(summary = "Заполнить форму обратной связи")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Форма отправлена",
                    content = @Content(schema = @Schema(implementation = FeedbackDTO.class))),
            @ApiResponse(responseCode = "400", description = "Неверные данные запроса")
    })
    public ResponseEntity<FeedbackDTO> createFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        return new ResponseEntity<>(feedbackService.createFeedback(feedbackDTO), HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Получить список всех обращений по обратной связи")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Список обращений успешно получен",
                    content = @Content(schema = @Schema(implementation = FeedbackDTO.class))),
            @ApiResponse(responseCode = "204", description = "Список пуст")
    })
    public ResponseEntity<List<FeedbackDTO>> getAll() {
        return new ResponseEntity<>(feedbackService.getFeedbackList(), HttpStatus.OK);
    }
}
