package ma.association.service;

import ma.association.DTO.DisscutionDTO;
import ma.association.model.Disscution;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface DisscutionService {

    ResponseEntity<Disscution> getDisscutionById(Long id);
    ResponseEntity<List<Disscution>> getAllDisscutions();
    ResponseEntity<Disscution> getDisscutionUser(Long id);

    ResponseEntity<String> addDisscution(DisscutionDTO newDissuction);
    ResponseEntity<Disscution> updateDisscution(Disscution d);
    ResponseEntity<Disscution> deleteDisscution(Long id);


}
