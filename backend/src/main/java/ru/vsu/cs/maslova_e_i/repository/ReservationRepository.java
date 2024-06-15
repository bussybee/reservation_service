package ru.vsu.cs.maslova_e_i.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.vsu.cs.maslova_e_i.model.Reservation;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
