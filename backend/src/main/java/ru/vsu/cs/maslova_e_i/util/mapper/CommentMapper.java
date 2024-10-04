package ru.vsu.cs.maslova_e_i.util.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ru.vsu.cs.maslova_e_i.dto.CommentDTO;
import ru.vsu.cs.maslova_e_i.model.Comment;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(target = "author", ignore = true)
    @Mapping(target = "institution", ignore = true)
    Comment toEntity(CommentDTO commentDTO);

    @Mapping(target = "authorId", source = "author.userId")
    @Mapping(target = "institutionId", source = "institution.id")
    @Mapping(target = "authorName", source = "author.firstName")
    CommentDTO toDto(Comment comment);
}
