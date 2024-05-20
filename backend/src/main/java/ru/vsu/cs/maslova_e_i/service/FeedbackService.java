package ru.vsu.cs.maslova_e_i.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Service;
import ru.vsu.cs.maslova_e_i.dto.FeedbackDTO;
import ru.vsu.cs.maslova_e_i.repository.FeedbackRepository;
import ru.vsu.cs.maslova_e_i.util.mapper.FeedbackMapper;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class FeedbackService {

    FeedbackRepository feedbackRepository;
    FeedbackMapper mapper;

    public FeedbackDTO createFeedback(FeedbackDTO feedbackDTO) {
        return mapper.toDto(feedbackRepository.save(mapper.toEntity(feedbackDTO)));
    }

    public FeedbackDTO getFeedbackById(Long id) {
        return mapper.toDto(feedbackRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Feedback", id)));
    }

    public List<FeedbackDTO> getFeedbackList() {
        return feedbackRepository.findAll().stream().map(mapper::toDto).toList();
    }
}
