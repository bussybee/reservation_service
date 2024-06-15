package ru.vsu.cs.maslova_e_i.util.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.vsu.cs.maslova_e_i.dto.ReservationDTO;
import ru.vsu.cs.maslova_e_i.model.Reservation;

@Mapper(componentModel = "spring")
public interface ReservationMapper {


    @Mapping(target = "clientName", source = ".", qualifiedByName = "getFullName")
    @Mapping(target = "institutionName", source = ".", qualifiedByName = "getInstitutionName")
    @Mapping(target = "email", source = "user.email")
    @Mapping(target = "phone", source = "user.phoneNumber")
    @Mapping(target = "courseName", source = "course.courseName")
    ReservationDTO toDto(Reservation reservation);

    @Named("getFullName")
    default String getFullName(Reservation reservation) {
        return reservation.getUser().getFirstName() + " " + reservation.getUser().getLastName();
    }

    @Named("getInstitutionName")
    default String getInstitutionName(Reservation reservation) {
        return reservation.getCourse().getInstitution().getName();
    }
}
