package ru.vsu.cs.maslova_e_i.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateReservationRequest {

    Long userId;
    Long courseId;
}
