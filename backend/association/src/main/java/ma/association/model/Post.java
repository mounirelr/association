package ma.association.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
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
    @JsonIgnore
    private User owner;


    @OneToMany(mappedBy = "post" , cascade = CascadeType.ALL)

    private List<Commentaire> commentaire = new ArrayList<>();
}
