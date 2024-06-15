package ru.vsu.cs.maslova_e_i.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.vsu.cs.maslova_e_i.dto.ReservationDTO;
import ru.vsu.cs.maslova_e_i.service.ReservationService;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {

    ReservationService reservationService;

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getById(@PathVariable Long id) {
        return new ResponseEntity<>(reservationService.getReservationById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ReservationDTO> create(@RequestParam(value = "userId") Long userId, @RequestParam("courseId") Long courseId) {
        return new ResponseEntity<>(reservationService.createReservation(userId, courseId), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ReservationDTO>> getAll() {
        return new ResponseEntity<>(reservationService.getReservations(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
