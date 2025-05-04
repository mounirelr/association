package ma.association.service;

import ma.association.DTO.LoginRequest;
import ma.association.exception.UserNotFoundException;
import ma.association.model.User;
import ma.association.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public User getUserById(Long id) {
       return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public ResponseEntity<String> newUser(User newUser) {

        if(userRepository.existsByEmail(newUser.getEmail()) ){
            ResponseEntity.badRequest().body("Email already exists");
        }
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        userRepository.save(newUser);
        return ResponseEntity.ok("User registered successfully!");


    }

    @Override
    public String deleteUser(Long id) {
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User deleted";
    }

    @Override
    public String blockUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));

        String status = user.getStatus();
        if(status.equals("Inactive"))
            user.setStatus("Active");
        else if(status.equals("Active"))
            user.setStatus("Inactive");
        userRepository.save(user);
        return "User status changed";
    }

    @Override
    public ResponseEntity<String> authenticateUser(LoginRequest loginRequest){
        User user =userRepository.findByEmail(loginRequest.getEmail());
        if(user==null){
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }

        else if(!passwordEncoder.matches(loginRequest.getPassword(),user.getPassword())){
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
        else if(user.getStatus().equals("Inactive")){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("L'accès à votre compte a été temporairement bloqué");
        }

        return ResponseEntity.ok("User authenticated successfully");
    }
}
