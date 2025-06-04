package ma.association.service;

import ma.association.DTO.CommentaireSendDTO;
import ma.association.DTO.DisscutionDTO;
import ma.association.DTO.DisscutionSendDTO;
import ma.association.DTO.NewComment;
import ma.association.model.Commentaire;
import ma.association.model.Disscution;
import ma.association.model.User;
import ma.association.repository.CommentaireRepository;
import ma.association.repository.DisscutionRepository;
import ma.association.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class DisscutionServiceImpl implements DisscutionService {
    @Autowired
    private DisscutionRepository disscutionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommentaireRepository commentaireRepository;


    @Override
    public ResponseEntity<Disscution> getDisscutionById(Long id) {
        return null;
    }

    public List<CommentaireSendDTO> mapToCommentSend(List<Commentaire> comments){
       List<CommentaireSendDTO> allComments = comments.stream().map(cm->
                new CommentaireSendDTO(cm.getId(),cm.getContenu(),cm.getDate(),cm.getUser().getFirstName()+" "+cm.getUser().getLastName()))
                .sorted(Comparator.comparing(CommentaireSendDTO::getId).reversed()).toList();
       return  allComments;

    }

    @Override
    public List<DisscutionSendDTO> getAllDisscutions() {
        List<DisscutionSendDTO> allDisscusions =disscutionRepository.findAll().stream().sorted(Comparator.comparing(Disscution::getId).reversed()).
                filter(d->d.getStatus().equals("Active"))
                .map(d->
                      new DisscutionSendDTO(
                                d.getId(),
                                d.getTitle(),
                                d.getDescription(),
                              mapToCommentSend(d.getCommentaire()),
                                d.getOwner().getFirstName()+" "+d.getOwner().getLastName()
                      ))
                .toList();
        return allDisscusions;

    }

    @Override
    public ResponseEntity<Disscution> getDisscutionUser(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<String> addDisscution(DisscutionDTO newDissuction) {
        User user = userRepository.findById(newDissuction.getUserId()).orElse(null);
        if(user != null) {
            Disscution disscution = new Disscution();
            disscution.setTitle(newDissuction.getTitle());
            disscution.setDescription(newDissuction.getDescription());
            disscution.setOwner(user);

        disscutionRepository.save(disscution);
            return ResponseEntity.ok("disscution add successfully");
        }
        return ResponseEntity.badRequest().body("Error adding disscution");


    }

   public  ResponseEntity<String> addMessage(NewComment newCommentaire){
        Commentaire commentaire = new Commentaire();
        commentaire.setContenu(newCommentaire.getContenu());
        User user = userRepository.findById(newCommentaire.getIdUser()).orElse(null);
        Disscution disscution = disscutionRepository.findById(newCommentaire.getIdPost()).orElse(null);
        if(disscution != null && user != null) {
            commentaire.setDisscution(disscution);
            commentaire.setUser(user);
            commentaireRepository.save(commentaire);
            return ResponseEntity.ok("comment add successfully");
        }
        return ResponseEntity.badRequest().body("Error adding comment");


   }

    @Override
    public ResponseEntity<Disscution> updateDisscution(Disscution d) {
        return null;
    }

    @Override
    public ResponseEntity<Disscution> deleteDisscution(Long id) {
        return null;
    }
}
