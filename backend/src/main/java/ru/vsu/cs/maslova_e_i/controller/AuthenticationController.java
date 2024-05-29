package ru.vsu.cs.maslova_e_i.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.tomcat.websocket.AuthenticationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.vsu.cs.maslova_e_i.dto.UserDTO;
import ru.vsu.cs.maslova_e_i.model.AuthenticationRequest;
import ru.vsu.cs.maslova_e_i.service.UserService;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("user")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    UserService service;

    @PostMapping("/create")
    @Operation(summary = "Создать пользователя")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Пользователь успешно создан"),
            @ApiResponse(responseCode = "400", description = "Неверные данные запроса")
    })
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO user) {
        return new ResponseEntity<>(service.createUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<UserDTO> authorize(@RequestBody AuthenticationRequest request) throws AuthenticationException {
        return new ResponseEntity<>(service.checkUser(request), HttpStatus.ACCEPTED);
    }
}
