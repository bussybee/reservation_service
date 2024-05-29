package ru.vsu.cs.maslova_e_i.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.vsu.cs.maslova_e_i.service.UserService;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    UserService service;

    @PatchMapping(value = "{id}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateUserImage(@PathVariable Long id,
                                                  @RequestPart MultipartFile image) throws IOException {

        service.updateUserImage(id, image);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "{id}/image", produces = {MediaType.IMAGE_PNG_VALUE})
    public byte[] getImage(@PathVariable Long id) {
        return service.getUserImage(id);
    }
}
