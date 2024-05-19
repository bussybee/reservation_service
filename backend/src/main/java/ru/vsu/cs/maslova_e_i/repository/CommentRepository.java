package ru.vsu.cs.maslova_e_i.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.vsu.cs.maslova_e_i.model.Comment;
import ru.vsu.cs.maslova_e_i.util.InstitutionType;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByAuthorUserId(Long authorId);

    @Query("SELECT c FROM Comment c JOIN c.institution WHERE c.institution.type = :type")
    List<Comment> findAllByInstitutionType(@Param("type") InstitutionType type);

    List<Comment> findAllByInstitutionId(Long institutionId);
}
