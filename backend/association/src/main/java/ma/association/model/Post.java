package ma.association.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String content;
    private LocalDate date;
    private String pieceJoint;
    private String etat;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "ownerId")
    @JsonBackReference(value = "user-post")
    private User owner;


    @OneToMany(mappedBy = "post" , cascade = CascadeType.ALL)
    @JsonManagedReference(value = "comment-post")
    private List<Commentaire> commentaire = new ArrayList<>();

    @OneToMany(mappedBy = "post" , cascade = CascadeType.ALL)
    @JsonBackReference(value = "post-post-like")
    private List<PostLike> postLikes = new ArrayList<>();
}
