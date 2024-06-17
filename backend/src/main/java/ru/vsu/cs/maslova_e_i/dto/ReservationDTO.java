package ru.vsu.cs.maslova_e_i.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jdk.jfr.Timestamp;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReservationDTO {

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Timestamp
    LocalDateTime createdAt;

    String institutionName;

    String courseName;

    String clientName;

    String email;

    String phone;

    Boolean approved;

    Boolean competed;
}
