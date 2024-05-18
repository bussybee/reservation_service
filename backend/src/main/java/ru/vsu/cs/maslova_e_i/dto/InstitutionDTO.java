package ru.vsu.cs.maslova_e_i.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import ru.vsu.cs.maslova_e_i.model.Comment;
import ru.vsu.cs.maslova_e_i.util.InstitutionType;

import java.util.Set;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InstitutionDTO {

    Long id;
    String name;
    String address;
    Double rating;
    Object image;
    InstitutionType type;
    Set<Comment> comments;

}
