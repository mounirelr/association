package ma.association.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor @AllArgsConstructor
public class User {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
        private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;

    private String role;

    private String status;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-post")
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-event")
    private List<Evenement> ownedEvents = new ArrayList<>();


    @OneToMany(mappedBy = "owner" , cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-discussion")
    private List<Disscution> disscutions = new ArrayList<>();


    @ManyToMany
    @JoinTable(
            name = "event_participants",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    private List<Evenement> participatingEvents = new ArrayList<>();


    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-post-like")
    private List<PostLike> postLikes = new ArrayList<>();

}
