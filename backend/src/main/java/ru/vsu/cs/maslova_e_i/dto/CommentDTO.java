package ru.vsu.cs.maslova_e_i.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CommentDTO {
    Long id;

    Long authorId;

    String comment;

    Long institutionId;

    LocalDateTime createdOn;

    Double rating;
}
