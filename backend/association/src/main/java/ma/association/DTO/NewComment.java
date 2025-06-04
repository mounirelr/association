package ma.association.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewComment {
    private String contenu;
    private Long idPost;
    private Long idUser;
}
