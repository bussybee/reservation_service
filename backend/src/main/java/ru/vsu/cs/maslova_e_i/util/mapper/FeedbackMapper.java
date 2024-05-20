package ru.vsu.cs.maslova_e_i.util.mapper;

import org.mapstruct.Mapper;
import ru.vsu.cs.maslova_e_i.dto.FeedbackDTO;
import ru.vsu.cs.maslova_e_i.model.Feedback;

@Mapper(componentModel = "spring")
public interface FeedbackMapper {

    Feedback toEntity(FeedbackDTO feedbackDTO);

    FeedbackDTO toDto(Feedback feedback);
}
