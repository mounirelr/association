package ma.association.service;

import ma.association.DTO.DisscutionDTO;
import ma.association.model.Disscution;
import ma.association.model.User;
import ma.association.repository.DisscutionRepository;
import ma.association.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class DisscutionServiceImpl implements DisscutionService {
    @Autowired
    private DisscutionRepository disscutionRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<Disscution> getDisscutionById(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<List<Disscution>> getAllDisscutions() {
        return null;
    }

    @Override
    public ResponseEntity<Disscution> getDisscutionUser(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<String> addDisscution(DisscutionDTO newDissuction) {
        User user = userRepository.findById(newDissuction.getUserId()).orElse(null);
        if(user != null) {
            Disscution disscution = new Disscution();
            disscution.setTitle(newDissuction.getTitle());
            disscution.setDescription(newDissuction.getDescription());
            disscution.setOwner(user);

        disscutionRepository.save(disscution);
            return ResponseEntity.ok("disscution add successfully");
        }
        return ResponseEntity.badRequest().body("Error adding disscution");


    }

    @Override
    public ResponseEntity<Disscution> updateDisscution(Disscution d) {
        return null;
    }

    @Override
    public ResponseEntity<Disscution> deleteDisscution(Long id) {
        return null;
    }
}
