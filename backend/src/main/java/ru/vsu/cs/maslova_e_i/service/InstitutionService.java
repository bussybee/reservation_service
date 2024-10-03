package ru.vsu.cs.maslova_e_i.service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Service;
import ru.vsu.cs.maslova_e_i.dto.CommentDTO;
import ru.vsu.cs.maslova_e_i.dto.CourseDTO;
import ru.vsu.cs.maslova_e_i.dto.InstitutionDTO;
import ru.vsu.cs.maslova_e_i.model.Comment;
import ru.vsu.cs.maslova_e_i.model.Institution;
import ru.vsu.cs.maslova_e_i.model.User;
import ru.vsu.cs.maslova_e_i.repository.CommentRepository;
import ru.vsu.cs.maslova_e_i.repository.InstitutionRepository;
import ru.vsu.cs.maslova_e_i.repository.UserRepository;
import ru.vsu.cs.maslova_e_i.util.InstitutionType;
import ru.vsu.cs.maslova_e_i.util.mapper.CommentMapper;
import ru.vsu.cs.maslova_e_i.util.mapper.InstitutionMapper;

import java.time.LocalDateTime;
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
    CourseService courseService;

    public InstitutionDTO createInstitution(InstitutionDTO institutionDTO) {
        return institutionMapper.toDto(institutionRepository.save(institutionMapper.toEntity(institutionDTO)));
    }

    public InstitutionDTO getInstitutionById(Long id) {
        Institution institution = institutionRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Institution", id));

        List<CourseDTO> services = courseService.getCoursesByInstitution(id);
        InstitutionDTO institutionDTO = institutionMapper.toDto(institution);
        institutionDTO.setServices(services);
        return institutionDTO;
    }

    public List<InstitutionDTO> getInstitutionsByType(InstitutionType type) {
        return institutionRepository.findAllByType(type).stream().map(institutionMapper::toDto).collect(Collectors.toList());
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
        entity.setCreatedOn(LocalDateTime.now());
        CommentDTO commentDTO = commentMapper.toDto(commentRepository.save(entity));
        updateRating(institutionId);
        return commentDTO;
    }

    public void updateInstitutionImage(Long id, String image) {
        Institution institution = institutionRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Institution", id));
        institution.setImage(image);
        institutionRepository.save(institution);
    }

    public String getInstitutionImage(Long id) {
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
        if (allCommentsForInstitution == null || allCommentsForInstitution.isEmpty()) {
            Institution institution = institutionRepository.findById(id)
                    .orElseThrow(() -> new ObjectNotFoundException("Institution", id));
            institution.setRating(0.0);
            institutionRepository.save(institution);
            return;
        }
        double rating = allCommentsForInstitution.stream()
                .filter(comment -> comment.getRating() != null)
                .mapToDouble(Comment::getRating)
                .average()
                .orElse(0.0);

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

    public List<InstitutionDTO> getFavoritesByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ObjectNotFoundException("User", userId));

        if (user.getFavorites() != null && !user.getFavorites().isEmpty()) {
            return user.getFavorites().stream()
                    .map(institutionMapper::toDto)
                    .collect(Collectors.toList());
        } else {
            return List.of();
        }
    }

    public List<InstitutionDTO> getAllInstitutions() {
        return institutionRepository.findAll().stream().map(institutionMapper::toDto).toList();
    }
}
