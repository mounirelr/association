package ma.association.DTO;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDTO {
    @Nullable
    private Long id;
    private String titre;
    private String content;
    private String etat = "Active";
        private Long userId;

    private MultipartFile pieceJoint;
}
