package ma.association.service;

import ma.association.DTO.NewComment;
import ma.association.DTO.PostDTO;
import ma.association.DTO.PostSendDTO;
import ma.association.model.Commentaire;
import ma.association.model.Post;
import ma.association.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PostService {

    public Post findById(long id);
    public ResponseEntity<String> save(PostDTO newPost);
    public List<PostSendDTO> findAll();
    public ResponseEntity<String> deleteById(Long id);
    public ResponseEntity<String> update(PostDTO updatedPost);

    public ResponseEntity<String> addComment(NewComment newComment);

    public ResponseEntity<String> likePost(Long postId, Long userId);

    public ResponseEntity<String> deleteComment(Long idComment);

}
