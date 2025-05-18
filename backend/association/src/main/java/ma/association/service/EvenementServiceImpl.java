package ma.association.service;

import ma.association.DTO.EvenementDTO;
import ma.association.model.Evenement;
import ma.association.model.User;
import ma.association.repository.EvenementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Time;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
public class EvenementServiceImpl implements EvenementService {
    @Autowired
    private EvenementRepository  evenementRepository;


    @Value("${UPLOAD_DIR}")
    private String uploadDir;

    @Override
    public ResponseEntity<Evenement> getEvenementById(Long id) {
        return null;
    }

    @Override
    public List<Evenement> getAllEvenement() {
        return evenementRepository.findAll().stream().sorted(Comparator.comparing(Evenement::getId).reversed())
                .filter(event -> event.getEtat().equals("Active")).toList();
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
    public ResponseEntity<String> updateEvenement(EvenementDTO evenementDTO) {
        Long eventId = evenementDTO.getId();
        Evenement evenement = evenementRepository.findById(eventId).orElse(null);
        if (evenement != null) {

            try{
                Path uploadPath =
                        Paths.get(uploadDir).toAbsolutePath().normalize();
                Files.createDirectories(uploadPath);
                MultipartFile file = evenementDTO.getPieceJoint();
                if (file != null && !file.isEmpty()) {
                    String fileName = StringUtils.cleanPath(
                            UUID.randomUUID() + "_" + file.getOriginalFilename()
                    );
                    if (fileName.contains("..")) {
                        return ResponseEntity.badRequest().body("Invalid file name");
                    }

                    Path targetLocation = uploadPath.resolve(fileName);
                    file.transferTo(targetLocation);
                    evenement.setPieceJoint(fileName);
                }


            } catch (Exception e) {
                throw new RuntimeException(e);
            }










            evenement.setTitre(evenementDTO.getTitre());
            evenement.setDescription(evenementDTO.getDescription());
            evenement.setHeure(Time.valueOf(evenementDTO.getHeure()+":00"));
            evenement.setDate(LocalDate.parse(evenementDTO.getDate()));
            evenement.setPlaceAdresse(evenementDTO.getPlaceAdresse());
            evenementRepository.save(evenement);
            return ResponseEntity.ok("Evenement modifier  avec success");
        }
        else return ResponseEntity.notFound().build();


    }

    @Override
    public ResponseEntity<String> deleteEvenement(Long id) {
        Evenement evenement = evenementRepository.findById(id).orElse(null);
        if (evenement != null) {
            evenement.setEtat("Supprimer");
        evenementRepository.save(evenement);
        return ResponseEntity.ok("Evenement supprimer  avec success");
        }
        return ResponseEntity.badRequest().body("Evenementne n'existe pas");
    }
}
