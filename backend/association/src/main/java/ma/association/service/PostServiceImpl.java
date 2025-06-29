package ma.association.service;

import ma.association.DTO.*;
import ma.association.model.*;
import ma.association.repository.CommentaireRepository;
import ma.association.repository.LikeRepository;
import ma.association.repository.PostRepository;
import ma.association.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
public class PostServiceImpl implements PostService {

    @Value("${UPLOAD_DIR}")
    private String uploadDir;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentaireRepository commentaireRepository;
    @Autowired
    private LikeRepository likeRepository;


    @Override
    public Post findById(long id) {
        return null;
    }

    @Override
    public ResponseEntity<String> save(PostDTO newPost) {
        try {
            Path uploadPath =
                    Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);
            MultipartFile file = newPost.getPieceJoint();
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


            Post post = new Post();
            post.setTitle(newPost.getTitre());
            post.setContent(newPost.getContent());
            post.setDate(LocalDate.now());
            post.setEtat(newPost.getEtat());
            post.setOwner(userRepository.getById(newPost.getUserId()));
            post.setPieceJoint(fileName);
            postRepository.save(post);
            return ResponseEntity.ok("Post ajoute avec success");

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    private  PostSendDTO mapToDTO(Post post) {
        PostSendDTO dto = new PostSendDTO();
        dto.setId(post.getId());
        dto.setTitre(post.getTitle());
        dto.setContent(post.getContent());
        dto.setDate(post.getDate());
        dto.setPieceJoint(post.getPieceJoint());
        dto.setUser(post.getOwner().getFirstName() + " " + post.getOwner().getLastName());
        return dto;
    }

    public List<CommentaireSendDTO> mapToCommentSend(List<Commentaire> comments){
        List<CommentaireSendDTO> allComments = comments.stream().map(cm->
                        new CommentaireSendDTO(cm.getId(),cm.getContenu(),cm.getDate(),cm.getUser().getFirstName()+" "+cm.getUser().getLastName()))
                .sorted(Comparator.comparing(CommentaireSendDTO::getId).reversed()).toList();
        return  allComments;

    }

    @Override
    public List<PostSendDTO> findAll() {
        List<PostSendDTO> posts = postRepository.findAll().stream().sorted(Comparator.comparing(Post::getId).reversed()).
                filter(d->d.getEtat().equals("Active"))
                .map(d->
                        new PostSendDTO(
     d.getId(),
    d.getTitle(),
    d.getContent(),
    mapToCommentSend(d.getCommentaire()),
    d.getOwner().getFirstName()+" "+d.getOwner().getLastName(),
    d.getDate(),
    d.getPieceJoint(),
     d.getPostLikes().stream().count(),
    d.getOwner().getId()
                        ))
                .toList();

        return posts;
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        try {
            postRepository.deleteById(id);
            return ResponseEntity.ok("Post deleted");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }



    @Override
    public ResponseEntity<String> addComment(NewComment newComment){
        Commentaire commentaire = new Commentaire();
        commentaire.setContenu(newComment.getContenu());
        User user = userRepository.findById(newComment.getIdUser()).orElse(null);
        Post post = postRepository.findById(newComment.getIdPost()).orElse(null);
        if(post != null && user != null) {
            commentaire.setPost(post);
            commentaire.setUser(user);
            commentaireRepository.save(commentaire);
            return ResponseEntity.ok("comment add successfully");
        }
        return ResponseEntity.badRequest().body("Error adding comment");

    }


    @Override
    public ResponseEntity<String> update(PostDTO updatedPost) {
        System.out.println("updatePost is called");
        Post post = postRepository.findById(updatedPost.getId()).orElse(null);
        if (post != null) {
            try {
                post.setTitle(updatedPost.getTitre());
                post.setContent(updatedPost.getContent());
                post.setDate(LocalDate.now());
                post.setEtat(updatedPost.getEtat());

                MultipartFile file = updatedPost.getPieceJoint();
                if (file != null && !file.isEmpty()) {
                    Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
                    Files.createDirectories(uploadPath);

                    String fileName = StringUtils.cleanPath(UUID.randomUUID() + "_" + file.getOriginalFilename());
                    if (fileName.contains("..")) {
                        return ResponseEntity.badRequest().body("Invalid file name");
                    }

                    Path targetLocation = uploadPath.resolve(fileName);
                    file.transferTo(targetLocation);
                    post.setPieceJoint(fileName);
                }
                postRepository.save(post);
                return ResponseEntity.ok("Post updated successfully");

            } catch (Exception e) {
                return ResponseEntity.badRequest().body(e.getMessage());
            }
        }
        return ResponseEntity.badRequest().body("Error updating post");
    }




    public ResponseEntity<String> deleteComment(Long idComment){
        System.out.println("deleteComment called with id = " + idComment);
        Commentaire commentaire = commentaireRepository.findById(idComment).orElse(null);
        if(commentaire != null) {
            commentaireRepository.delete(commentaire);
            System.out.println("Comment deleted from DB");
            return ResponseEntity.ok("Comment deleted");
        }
        System.out.println("Comment not found in DB");
        return ResponseEntity.badRequest().body("Error deleting comment");
    }









    public ResponseEntity<String> likePost(Long postId,Long userId){
        Post post = postRepository.findById(postId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);
        if(post != null && user != null) {
            PostLike existingLike = likeRepository.findByPost_Id(postId).orElse(null);
            if(existingLike != null && existingLike.getUser().getId().equals(userId)) {
                    likeRepository.delete(existingLike);
                    return ResponseEntity.ok("like removed successfully");

            }
            PostLike postLike = new PostLike();
            postLike.setPost(post);
            postLike.setUser(user);
            likeRepository.save(postLike);
            return ResponseEntity.ok("like add successfully");
        }
        return ResponseEntity.badRequest().body("Error like post");

    }
}
