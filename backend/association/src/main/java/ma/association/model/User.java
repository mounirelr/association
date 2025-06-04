package ma.association.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;

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
    private List<Evenement> ownedEvents = new ArrayList<>();


    @OneToMany(mappedBy = "owner" , cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Disscution> disscutions = new ArrayList<>();


    @ManyToMany
    @JoinTable(
            name = "event_participants",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    private List<Evenement> participatingEvents = new ArrayList<>();

}
