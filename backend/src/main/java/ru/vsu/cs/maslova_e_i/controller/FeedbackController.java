package ru.vsu.cs.maslova_e_i.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    public ResponseEntity<FeedbackDTO> getFeedbackById(@PathVariable Long id) {
        return new ResponseEntity<>(feedbackService.getFeedbackById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<FeedbackDTO> createFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        return new ResponseEntity<>(feedbackService.createFeedback(feedbackDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FeedbackDTO>> getAll() {
        return new ResponseEntity<>(feedbackService.getFeedbackList(), HttpStatus.OK);
    }
}
