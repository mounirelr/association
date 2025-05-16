package ma.association.service;

import ma.association.model.Evenement;
import ma.association.model.User;
import ma.association.repository.EvenementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EvenementServiceImpl implements EvenementService {
    @Autowired
    private EvenementRepository  evenementRepository;

    @Override
    public ResponseEntity<Evenement> getEvenementById(Long id) {
        return null;
    }

    @Override
    public List<Evenement> getAllEvenement() {
        return List.of();
    }

    @Override
    public List<Evenement> getAllEvenementByUser(User user) {
        return List.of();
    }

    @Override
    public ResponseEntity<String> addEvenement(Evenement evenement) {
        evenementRepository.save(evenement);
        return ResponseEntity.ok("Evenement ajoute avec success");

    }

    @Override
    public ResponseEntity<String> updateEvenement(Evenement evenement) {
        return null;
    }

    @Override
    public ResponseEntity<String> deleteEvenement(Long id) {
        return null;
    }
}
