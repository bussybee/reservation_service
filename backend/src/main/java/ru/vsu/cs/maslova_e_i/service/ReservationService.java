package ru.vsu.cs.maslova_e_i.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Service;
import ru.vsu.cs.maslova_e_i.dto.CreateReservationRequest;
import ru.vsu.cs.maslova_e_i.dto.ReservationDTO;
import ru.vsu.cs.maslova_e_i.model.Course;
import ru.vsu.cs.maslova_e_i.model.Reservation;
import ru.vsu.cs.maslova_e_i.model.User;
import ru.vsu.cs.maslova_e_i.repository.CourseRepository;
import ru.vsu.cs.maslova_e_i.repository.ReservationRepository;
import ru.vsu.cs.maslova_e_i.repository.UserRepository;
import ru.vsu.cs.maslova_e_i.util.mapper.ReservationMapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class ReservationService {
    ReservationMapper reservationMapper;
    ReservationRepository reservationRepository;
    CourseRepository courseRepository;
    UserRepository userRepository;

    public ReservationDTO createReservation(CreateReservationRequest createReservationRequest) {
        Course course = courseRepository.findById(createReservationRequest.getCourseId())
                .orElseThrow(() -> new ObjectNotFoundException("Course", createReservationRequest.getCourseId()));
        User user = userRepository.findById(createReservationRequest.getUserId())
                .orElseThrow(() -> new ObjectNotFoundException("User", createReservationRequest.getUserId()));
        Reservation reservation = new Reservation();
        reservation.setCreatedAt(LocalDateTime.now());
        reservation.setUser(user);
        reservation.setCourse(course);
        return reservationMapper.toDto(reservationRepository.save(reservation));
    }

    public ReservationDTO getReservationById(Long id) {
        return reservationMapper
                .toDto(reservationRepository.findById(id)
                        .orElseThrow(() -> new ObjectNotFoundException("Reservation", id)));
    }

    public List<ReservationDTO> getReservations() {
        return reservationRepository.findAll()
                .stream().map(reservationMapper::toDto)
                .collect(Collectors.toList());
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    public ReservationDTO approveReservationRequest(Long id){
        Reservation reservation = reservationRepository
                .findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Reservation", id));
        reservation.setApproved(true);
        return reservationMapper.toDto(reservationRepository.save(reservation));
    }

}