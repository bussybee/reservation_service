package ru.vsu.cs.maslova_e_i.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import ru.vsu.cs.maslova_e_i.util.InstitutionType;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InstitutionDTO {

    Long id;
    String name;
    String address;
    Double rating;
    String image;
    InstitutionType type;

}
