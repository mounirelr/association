package ma.association.DTO;

import jakarta.annotation.Nullable;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
@Data
public class EvenementDTO {
    private Long id;
    private String titre;
    private String description;
    private String date;
    private String heure;
    private String placeAdresse;
    private String etat;
    private Long userId;
    @Nullable
    private MultipartFile pieceJoint;
}
