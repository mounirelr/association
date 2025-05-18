package ma.association.service;

import ma.association.DTO.EvenementDTO;
import ma.association.model.Evenement;
import ma.association.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface EvenementService {
    ResponseEntity<Evenement> getEvenementById(Long id);
    List<Evenement> getAllEvenement();
    List<Evenement> getAllEvenementByUser(User user);
    ResponseEntity<String> addEvenement(Evenement evenement);
    ResponseEntity<String> updateEvenement(EvenementDTO evenementDTO);
    ResponseEntity<String> deleteEvenement(Long id);

}
