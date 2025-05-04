package ma.association.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;

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

}
