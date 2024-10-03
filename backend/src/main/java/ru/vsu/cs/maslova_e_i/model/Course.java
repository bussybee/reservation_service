package ru.vsu.cs.maslova_e_i.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jdk.jfr.Timestamp;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "courses")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String courseName;

    @ManyToOne(optional = false)
    @JoinColumn(name = "institution_id")
    Institution institution;

    @Timestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "start_time")
    LocalDateTime startTime;

    Double duration;

    public LocalDateTime getEndTime() {
        return startTime.plusHours(duration.longValue());
    }
}
