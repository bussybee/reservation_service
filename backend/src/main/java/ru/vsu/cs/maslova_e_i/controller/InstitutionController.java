package ru.vsu.cs.maslova_e_i.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.vsu.cs.maslova_e_i.dto.CommentDTO;
import ru.vsu.cs.maslova_e_i.dto.InstitutionDTO;
import ru.vsu.cs.maslova_e_i.service.InstitutionService;
import ru.vsu.cs.maslova_e_i.util.InstitutionType;

import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class InstitutionController {
    InstitutionService service;

    @PostMapping("/institution")
    @Operation(summary = "Создать учреждение")
    public ResponseEntity<InstitutionDTO> createInstitution(@RequestBody InstitutionDTO institution) {
        return new ResponseEntity<>(service.createInstitution(institution), HttpStatus.CREATED);
    }

    @GetMapping("/fitness")
    @Operation(summary = "Получить список фитнес-центров")
    public ResponseEntity<List<InstitutionDTO>> getFitnessList() {
        return new ResponseEntity<>(service.getInstitutionsByType(InstitutionType.FITNESS), HttpStatus.OK);
    }

    @GetMapping("/spaCenters")
    @Operation(summary = "Получить список спа-центров")
    public ResponseEntity<List<InstitutionDTO>> getSpaCenterList() {
        return new ResponseEntity<>(service.getInstitutionsByType(InstitutionType.SPA_SALON), HttpStatus.OK);
    }

    @GetMapping("/beautySalons")
    @Operation(summary = "Получить список салонов красоты")
    public ResponseEntity<List<InstitutionDTO>> getBeautySalonList() {
        return new ResponseEntity<>(service.getInstitutionsByType(InstitutionType.BEAUTY_SALON), HttpStatus.OK);
    }

    @GetMapping("/institution/{id}")
    @Operation(summary = "Получить учреждение по id")
    public ResponseEntity<InstitutionDTO> getInstitutionById(@PathVariable Long id) {
        return new ResponseEntity<>(service.getInstitutionById(id), HttpStatus.OK);
    }

    @PostMapping("/institution/{id}/comment")
    @Operation(summary = "Добавить отзыв к учреждению")
    public ResponseEntity<CommentDTO> addComment(@RequestBody CommentDTO newComment, @PathVariable Long id) {
        return new ResponseEntity<>(service.addComment(newComment, id), HttpStatus.OK);
    }

    @PatchMapping(value = "institution/{id}/image")
    @Operation(summary = "Обновить изображение учреждения")
    public ResponseEntity<String> updateInstitutionImage(@PathVariable Long id,
                                                         @RequestParam String imageUrl) {

        service.updateInstitutionImage(id, imageUrl);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "institution/image/{id}")
    @Operation(summary = "Получить изображение учреждения по id")
    public ResponseEntity<String> getImage(@PathVariable Long id) {
        String imageUrl = service.getInstitutionImage(id);
        return ResponseEntity.ok(imageUrl);
    }

    @PutMapping("institution/{id}")
    public ResponseEntity<InstitutionDTO> updateInstitution(@PathVariable Long id, @RequestBody InstitutionDTO institutionDTO) {
        return new ResponseEntity<>(service.updateInstitution(id, institutionDTO), HttpStatus.OK);
    }

    @GetMapping("institution/{institutionId}/tofavorites/{userId}")
    public ResponseEntity<Void> addToFavorites(@PathVariable Long institutionId, @PathVariable Long userId) {
        service.addToFavoritesByUser(userId, institutionId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/institution/favorites/{userId}")
    @Operation(summary = "Получить список избранных учреждений пользователя")
    public ResponseEntity<List<InstitutionDTO>> getFavoritesByUser(@PathVariable Long userId) {
        return new ResponseEntity<>(service.getFavoritesByUser(userId), HttpStatus.OK);
    }
}
