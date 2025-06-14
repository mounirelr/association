package ma.association.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.stream.events.Comment;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostSendDTO {

    private Long id;
    private String titre;
    private String content;
    private List<CommentaireSendDTO> commentaire = new ArrayList<>();
    private String user;
    private LocalDate date;
    private String pieceJoint;
}
