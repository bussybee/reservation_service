package ru.vsu.cs.maslova_e_i.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.tomcat.websocket.AuthenticationException;
import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.vsu.cs.maslova_e_i.dto.UserDTO;
import ru.vsu.cs.maslova_e_i.model.AuthenticationRequest;
import ru.vsu.cs.maslova_e_i.model.User;
import ru.vsu.cs.maslova_e_i.repository.UserRepository;
import ru.vsu.cs.maslova_e_i.util.mapper.UserMapper;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class UserService {

    UserRepository userRepository;
    UserMapper userMapper;

    public UserDTO createUser(UserDTO user) {
        User userEntity = userMapper.toUser(user);
        userEntity.setPhoneNumber(normalizePhoneNumber(user.getPhoneNumber()));
        userEntity.setPassword(encodePassword(userEntity.getPassword()));
        return userMapper.toDto(userRepository.save(userEntity));
    }

    public UserDTO getUserById(Long userId) {
        return userMapper.toDto(userRepository.findById(userId)
                .orElseThrow(() -> new ObjectNotFoundException("User", userId)));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User getUserByEmailOrPhone(String emailOrPhoneNumber) {
        return userRepository.findByEmailOrPhoneNumber(emailOrPhoneNumber, normalizePhoneNumber(emailOrPhoneNumber))
                .orElseThrow(() -> new ObjectNotFoundException("User", (Object) emailOrPhoneNumber));
    }

    public UserDTO checkUser(AuthenticationRequest request) throws AuthenticationException {
        User userByEmailOrPhone = getUserByEmailOrPhone(request.getEmailOrPhone());
        if (request.getPassword().equals(decodePassword(userByEmailOrPhone.getPassword()))) {
            return userMapper.toDto(userByEmailOrPhone);
        }
        throw new AuthenticationException("Login not allowed");
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toDto)
                .collect(Collectors.toList());
    }

    public void updateUserImage(Long id, MultipartFile image) throws IOException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("User", id));
        user.setImage(image.getBytes());
        userRepository.save(user);
    }

    public byte[] getUserImage(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("User", id)).getImage();
    }

    private String decodePassword(String password) {
        return new String(Base64.getDecoder().decode(password));
    }

    private String normalizePhoneNumber(String phoneNumber) {
        return phoneNumber.replaceAll("^(\\+?[78])", "");
    }

    private String encodePassword(String password) {
        return Base64.getEncoder().encodeToString(password.getBytes());
    }
}
