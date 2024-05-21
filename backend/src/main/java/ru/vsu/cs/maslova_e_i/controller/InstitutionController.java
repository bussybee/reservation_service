package ru.vsu.cs.maslova_e_i.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.vsu.cs.maslova_e_i.dto.CommentDTO;
import ru.vsu.cs.maslova_e_i.dto.InstitutionDTO;
import ru.vsu.cs.maslova_e_i.service.InstitutionService;
import ru.vsu.cs.maslova_e_i.util.InstitutionType;

import java.io.IOException;
import java.util.List;

@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class InstitutionController {
    InstitutionService service;

    @PostMapping("/institution")
    public ResponseEntity<InstitutionDTO> createInstitution(@RequestBody InstitutionDTO institution) {
        return new ResponseEntity<>(service.createInstitution(institution), HttpStatus.CREATED);
    }

    @GetMapping("/fitness")
    public ResponseEntity<List<InstitutionDTO>> getFitnessList() {
        return new ResponseEntity<>(service.getInstitutionsByType(InstitutionType.FITNESS), HttpStatus.OK);
    }

    @GetMapping("/spaCenters")
    public ResponseEntity<List<InstitutionDTO>> getSpaCenterList() {
        return new ResponseEntity<>(service.getInstitutionsByType(InstitutionType.SPA_SALON), HttpStatus.OK);
    }

    @GetMapping("/beautySalons")
    public ResponseEntity<List<InstitutionDTO>> getBeautySalonList() {
        return new ResponseEntity<>(service.getInstitutionsByType(InstitutionType.BEAUTY_SALON), HttpStatus.OK);
    }

    @GetMapping("/institution/{id}")
    public ResponseEntity<InstitutionDTO> getInstitutionById(@PathVariable Long id) {
        return new ResponseEntity<>(service.getInstitutionById(id), HttpStatus.OK);
    }

    @PostMapping("/institution/{id}/comment")
    public ResponseEntity<CommentDTO> addComment(@RequestBody CommentDTO newComment, @PathVariable Long id) {
        return new ResponseEntity<>(service.addComment(newComment, id), HttpStatus.OK);
    }

    @PatchMapping(value = "institution/{id}/image", consumes = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<String> updateUserImage(@PathVariable Long id,
                                                  @RequestPart MultipartFile image) throws IOException {

        service.updateInstitutionImage(id, image);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "institution/image/{id}", produces = {MediaType.IMAGE_PNG_VALUE})
    public byte[] getImage(@PathVariable Long id) {
        return service.getInstitutionImage(id);
    }
}
