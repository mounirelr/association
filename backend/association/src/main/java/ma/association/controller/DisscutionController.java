package ma.association.controller;

import ma.association.DTO.DisscutionDTO;
import ma.association.model.Disscution;
import ma.association.service.DisscutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000")
public class DisscutionController {
    @Autowired
    private DisscutionService disscutionService;

    @PostMapping("/addDisscution")
    public ResponseEntity<String> addDisscution(@RequestBody DisscutionDTO newDissuction) {
         return disscutionService.addDisscution(newDissuction);
    }
}
