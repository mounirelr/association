package ma.association.controller;

import ma.association.exception.UserNotFoundException;
import ma.association.model.User;
import ma.association.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser ){
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getUsers(){
        return userRepository.findAll();
    }

    @DeleteMapping("/user/{id}")
    String deleteUser(@PathVariable Long id){
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return "User deleted";
    }

    @PatchMapping("/user/{id}")
    String blockUser(@PathVariable Long id){
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));

        String status = user.getStatus();
        if(status.equals("Inactive"))
        user.setStatus("Active");
        else if(status.equals("Active"))
            user.setStatus("Inactive");
        userRepository.save(user);
        return "User status changed";


    }

}
