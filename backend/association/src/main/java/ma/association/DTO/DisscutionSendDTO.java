package ma.association.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.association.model.Commentaire;

import java.util.ArrayList;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DisscutionSendDTO {
    private int id;
    private String title;
    private String description;
    private List<CommentaireSendDTO> commentaire = new ArrayList<>();
    private String user;
    private Long userId;
}
