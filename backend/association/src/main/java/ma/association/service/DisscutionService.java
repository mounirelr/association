package ma.association.service;

import ma.association.DTO.DisscutionDTO;
import ma.association.DTO.DisscutionSendDTO;
import ma.association.DTO.NewComment;
import ma.association.model.Disscution;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface DisscutionService {

    ResponseEntity<Disscution> getDisscutionById(Long id);
    List<DisscutionSendDTO> getAllDisscutions();
    ResponseEntity<Disscution> getDisscutionUser(Long id);

    ResponseEntity<String> addDisscution(DisscutionDTO newDissuction);
    ResponseEntity<Disscution> updateDisscution(Disscution d);
    ResponseEntity<String> deleteDisscution(Long id);
    ResponseEntity<String> addMessage(NewComment newCommentaire);
    ResponseEntity<String> deleteMessageDisscution(Long id);
    ResponseEntity<String> updateMessageDisscution(Long idMessage,NewComment newComment);
    List<DisscutionSendDTO> getDisscutionsUser(Long idUser);


}
