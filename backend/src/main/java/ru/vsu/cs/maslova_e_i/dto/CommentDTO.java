package ru.vsu.cs.maslova_e_i.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import ru.vsu.cs.maslova_e_i.model.Institution;
import ru.vsu.cs.maslova_e_i.model.User;

import java.time.LocalDateTime;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentDTO {
    Long id;

    User author;

    String comment;

    private Institution institution;

    LocalDateTime createdOn;

    Double rating;
}
