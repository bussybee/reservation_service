package ru.vsu.cs.maslova_e_i.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.apache.tomcat.websocket.AuthenticationException;
import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Service;
import ru.vsu.cs.maslova_e_i.dto.UserDTO;
import ru.vsu.cs.maslova_e_i.model.User;
import ru.vsu.cs.maslova_e_i.repository.UserRepository;
import ru.vsu.cs.maslova_e_i.util.mapper.UserMapper;

import java.util.Base64;

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

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ObjectNotFoundException("User", userId));
    }

    public User getUserByEmailOrPhone(String emailOrPassword) {
        return userRepository.findByEmailOrPhoneNumber(emailOrPassword, emailOrPassword)
                .orElseThrow(() -> new ObjectNotFoundException("User", (Object) emailOrPassword));
    }

    public UserDTO checkUser(String emailOrPassword, String password) throws AuthenticationException {
        User userByEmailOrPhone = getUserByEmailOrPhone(emailOrPassword);
        if (password.equals(decodePassword(userByEmailOrPhone.getPassword()))) {
            return userMapper.toDto(userByEmailOrPhone);
        }
        throw new AuthenticationException("Login not allowed");
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
