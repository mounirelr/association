package ma.association.service;


import ma.association.DTO.LoginRequest;
import ma.association.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface UserService {
    User getUserById(Long id);
    List<User> getUsers();
     ResponseEntity<String> newUser(User newUser );
    ResponseEntity<String> deleteUser( Long id);
    String blockUser( Long id);
    ResponseEntity<String> updateUser(User updatedUser);
    ResponseEntity<Map<String, Object>> authenticateUser(LoginRequest loginRequest);
    public ResponseEntity<String> upgradeToModerator(Long id);

}
