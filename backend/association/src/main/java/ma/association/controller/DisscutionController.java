package ma.association.controller;

import ma.association.DTO.DisscutionDTO;
import ma.association.DTO.DisscutionSendDTO;
import ma.association.DTO.NewComment;
import ma.association.service.DisscutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @DeleteMapping("/deleteDisscution/{id}")
    public ResponseEntity<String> deleteDisscution(@PathVariable Long id) {
        return disscutionService.deleteDisscution(id);
    }

    @DeleteMapping("/deleteMessageDisscution/{id}")
    public ResponseEntity<String> deleteDisscutionMessage(@PathVariable Long id) {
        return disscutionService.deleteMessageDisscution(id);
    }

    @PutMapping("updateMessageDisscution/{id}")
    public ResponseEntity<String> updateMessageDisscution(@PathVariable Long id, @RequestBody NewComment newComment) {
        return disscutionService.updateMessageDisscution(id, newComment);
    }

    @GetMapping("/discussionsUser")
    public List<DisscutionSendDTO> getDisscutionsUser(@RequestParam Long userId ) {
        return disscutionService.getDisscutionsUser(userId);
    }
}
