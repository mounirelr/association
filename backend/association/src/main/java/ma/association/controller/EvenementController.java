package ma.association.controller;

import ma.association.model.Evenement;
import ma.association.service.EvenementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000")
public class EvenementController {
    @Autowired
    private EvenementService evenementService;
    @PostMapping("/addEvent")
    public ResponseEntity<String> addEvent(@RequestBody Evenement evenement) {
        return evenementService.addEvenement(evenement);
    }
}
