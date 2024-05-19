package ru.vsu.cs.maslova_e_i.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Service;
import ru.vsu.cs.maslova_e_i.dto.CommentDTO;
import ru.vsu.cs.maslova_e_i.repository.CommentRepository;
import ru.vsu.cs.maslova_e_i.util.InstitutionType;
import ru.vsu.cs.maslova_e_i.util.mapper.CommentMapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class CommentService {

    CommentRepository commentRepository;
    CommentMapper commentMapper;

    public CommentDTO getCommentById(Long commentId) {
        return commentMapper.toDto(commentRepository
                .findById(commentId)
                .orElseThrow(() -> new ObjectNotFoundException("Comment", commentId)));
    }

    public List<CommentDTO> getCommentsByInstitutionId(Long institutionId) {
        return commentRepository.findAllByInstitutionId(institutionId).stream()
                .map(commentMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<CommentDTO> getCommentsByInstitutionType(InstitutionType type) {
        return commentRepository.findAllByInstitutionType(type).stream()
                .map(commentMapper::toDto)
                .collect(Collectors.toList());
    }

}
