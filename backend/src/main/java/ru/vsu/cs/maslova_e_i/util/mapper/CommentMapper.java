package ru.vsu.cs.maslova_e_i.util.mapper;

import org.mapstruct.Mapper;
import ru.vsu.cs.maslova_e_i.dto.CommentDTO;
import ru.vsu.cs.maslova_e_i.model.Comment;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment toEntity(CommentDTO userDTO);

    CommentDTO toDto(Comment user);
}
