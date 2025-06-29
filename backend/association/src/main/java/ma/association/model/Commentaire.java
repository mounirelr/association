package ma.association.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String contenu;
    private LocalDate date = LocalDate.now();
    private String etat="Active";



    @ManyToOne(fetch = FetchType.LAZY )
    @JoinColumn(name = "userId" , nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "disscutionId")
    @JsonBackReference(value = "comment-discussion")
    private Disscution disscution;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "postId")
    @JsonBackReference(value = "comment-post")
    private Post post;
}
