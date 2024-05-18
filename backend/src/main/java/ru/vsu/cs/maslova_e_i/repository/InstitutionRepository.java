package ru.vsu.cs.maslova_e_i.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.vsu.cs.maslova_e_i.model.Institution;
import ru.vsu.cs.maslova_e_i.util.InstitutionType;

import java.util.List;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {

    List<Institution> findAllByType(InstitutionType type);
}
