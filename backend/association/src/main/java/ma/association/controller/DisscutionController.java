package ma.association.controller;

import ma.association.DTO.DisscutionDTO;
import ma.association.DTO.DisscutionSendDTO;
import ma.association.DTO.NewComment;
import ma.association.model.Disscution;
import ma.association.service.DisscutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class DisscutionController {
    @Autowired
    private DisscutionService disscutionService;

    @PostMapping("/addDisscution")
    public ResponseEntity<String> addDisscution(@RequestBody DisscutionDTO newDissuction) {
         return disscutionService.addDisscution(newDissuction);
    }
    @GetMapping("/disscutions")
    public List<DisscutionSendDTO> getDisscutions() {
        return  disscutionService.getAllDisscutions();
    }

    @PostMapping("/addMessage")
    public ResponseEntity<String> addMessage(@RequestBody NewComment newComment) {
        return disscutionService.addMessage(newComment);
    }
}
