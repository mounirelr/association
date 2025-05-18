package ma.association.controller;

import ma.association.DTO.EvenementDTO;
import ma.association.model.Evenement;
import ma.association.repository.UserRepository;
import ma.association.service.EvenementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Time;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin("http://localhost:3000")
public class EvenementController {
    @Autowired
    private EvenementService evenementService;

    @Autowired
    private Environment environment;

    @Autowired
    private UserRepository userRepository;

    @Value("${UPLOAD_DIR}")
    private String uploadDir;

    @PostMapping(value = "/addEvent", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addEvent(@ModelAttribute EvenementDTO evenementDTO) {
        try {
            Path uploadPath =
                    Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);
            MultipartFile file = evenementDTO.getPieceJoint();
            if (file == null || file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is required");
            }

            String fileName = StringUtils.cleanPath(
                    UUID.randomUUID() + "_" + file.getOriginalFilename()
            );
            if (fileName.contains("..")) {
                return ResponseEntity.badRequest().body("Invalid file name");
            }

            Path targetLocation = uploadPath.resolve(fileName);
            file.transferTo(targetLocation);

            Evenement evenement = new Evenement();
            evenement.setTitre(evenementDTO.getTitre());
            evenement.setDescription(evenementDTO.getDescription());
            evenement.setDate(LocalDate.parse(evenementDTO.getDate()));
            evenement.setHeure(Time.valueOf(evenementDTO.getHeure()+":00"));
            evenement.setPlaceAdresse(evenementDTO.getPlaceAdresse());
            evenement.setEtat(evenementDTO.getEtat());
            evenement.setUser(userRepository.getById(evenementDTO.getUserId()));
            evenement.setPieceJoint(fileName);
            evenementService.addEvenement(evenement);

            return ResponseEntity.ok("Evenement ajoute avec success");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur: " + e.getMessage());
        }
    }
    @GetMapping("/events")
    public List<Evenement> getEvenementList(){
       return  evenementService.getAllEvenement();
    }


    @DeleteMapping("/deleteEvent/{id}")
    public ResponseEntity<String> deleteEvenement(@PathVariable Long id) {
        return evenementService.deleteEvenement(id);
    }


    @PutMapping(value = "/updateEvent", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateEvenement(@ModelAttribute EvenementDTO evenementDTO) {
      return  evenementService.updateEvenement(evenementDTO);
    }
}