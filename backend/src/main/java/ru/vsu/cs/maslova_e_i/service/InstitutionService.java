package ru.vsu.cs.maslova_e_i.service;

import org.springframework.web.multipart.MultipartFile;
import ru.vsu.cs.maslova_e_i.dto.CommentDTO;
import ru.vsu.cs.maslova_e_i.dto.InstitutionDTO;
import ru.vsu.cs.maslova_e_i.model.Comment;
import ru.vsu.cs.maslova_e_i.model.Institution;
import ru.vsu.cs.maslova_e_i.model.User;
import ru.vsu.cs.maslova_e_i.repository.CommentRepository;
import ru.vsu.cs.maslova_e_i.repository.InstitutionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Service;
import ru.vsu.cs.maslova_e_i.repository.UserRepository;
import ru.vsu.cs.maslova_e_i.util.InstitutionType;
import ru.vsu.cs.maslova_e_i.util.mapper.CommentMapper;
import ru.vsu.cs.maslova_e_i.util.mapper.InstitutionMapper;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class InstitutionService {
    InstitutionRepository institutionRepository;
    CommentRepository commentRepository;
    InstitutionMapper institutionMapper;
    CommentMapper commentMapper;
    UserRepository userRepository;

    public InstitutionDTO createInstitution(InstitutionDTO institutionDTO) {
        return institutionMapper.toDto(institutionRepository.save(institutionMapper.toEntity(institutionDTO)));
    }

    public InstitutionDTO getInstitutionById(Long id) {
        return institutionMapper.toDto(institutionRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Institution", id)));
    }

    public List<InstitutionDTO> getInstitutionsByType(InstitutionType type) {
        return institutionRepository.findAllByType(type).stream().map(institutionMapper::toDto).collect(Collectors.toList());
    }

    public List<InstitutionDTO> getAll() {
        return institutionRepository.findAll().stream().map(institutionMapper::toDto).collect(Collectors.toList());
    }

    public CommentDTO addComment(CommentDTO newComment, Long institutionId) {
        Institution institution = institutionRepository
                .findById(institutionId)
                .orElseThrow(() -> new ObjectNotFoundException("Institution", institutionId));
        User author = userRepository
                .findById(newComment.getAuthorId())
                .orElseThrow(() -> new ObjectNotFoundException("User", newComment.getAuthorId()));
        Comment entity = commentMapper.toEntity(newComment);
        entity.setInstitution(institution);
        entity.setAuthor(author);
        CommentDTO commentDTO = commentMapper.toDto(commentRepository.save(entity));
        updateRating(institutionId);
        return commentDTO;
    }

    public void updateInstitutionImage(Long id, MultipartFile image) throws IOException {
        Institution institution = institutionRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Institution", id));
        institution.setImage(image.getBytes());
        institutionRepository.save(institution);
    }

    public byte[] getInstitutionImage(Long id) {
        return institutionRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Institution", id)).getImage();
    }

    public InstitutionDTO updateInstitution(Long id, InstitutionDTO institutionDTO) {
        Institution institution = institutionRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Institution", id));
        institution.setName(institutionDTO.getName());
        institution.setAddress(institutionDTO.getAddress());
        Institution updated = institutionRepository.save(institution);
        return institutionMapper.toDto(updated);
    }

    private void updateRating(Long id) {
        List<Comment> allCommentsForInstitution = commentRepository.findAllByInstitutionId(id);
        double rating = allCommentsForInstitution.stream().mapToDouble(Comment::getRating).sum();
        Institution institution = institutionRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Institution", id));
        institution.setRating(rating);
        institutionRepository.save(institution);
    }

    public void addToFavoritesByUser(Long userId, Long institutionId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ObjectNotFoundException("User", userId));
        Institution institution = institutionRepository.findById(institutionId)
                .orElseThrow(() -> new ObjectNotFoundException("Institution", institutionId));
        if (user.getFavorites() != null) {
            user.getFavorites().add(institution);
        } else {
            user.setFavorites(new HashSet<>());
            user.getFavorites().add(institution);
        }
        userRepository.save(user);
    }
}
