package ru.vsu.cs.maslova_e_i.model;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import ru.vsu.cs.maslova_e_i.util.InstitutionType;

@Entity
@Data
@Table(name = "institutions")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Institution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    String address;
    Double rating;
    byte[] image;
    @Enumerated(EnumType.STRING)
    InstitutionType type;
}
