package ma.association.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentaireSendDTO {
    private Long id;
    private String contenu;
    private LocalDate date;
    private String user;
    private Long userId;
}
