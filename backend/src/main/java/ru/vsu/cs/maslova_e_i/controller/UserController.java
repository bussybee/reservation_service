package ru.vsu.cs.maslova_e_i.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.vsu.cs.maslova_e_i.dto.UserDTO;
import ru.vsu.cs.maslova_e_i.service.UserService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("user")
@CrossOrigin(origins = "http://localhost:8081")
public class UserController {

    UserService service;

    @PatchMapping(value = "{id}/image-url")
    public ResponseEntity<String> updateUserImage(@PathVariable Long id, @RequestParam String imageUrl) {
        service.updateUserImage(id, imageUrl);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "{id}/image")
    public ResponseEntity<String> getImage(@PathVariable Long id) {
        String imageUrl = service.getUserImage(id);
        return ResponseEntity.ok(imageUrl);
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAll() {
        return new ResponseEntity<>(service.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable Long id) {
        return new ResponseEntity<>(service.getUserById(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        service.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
