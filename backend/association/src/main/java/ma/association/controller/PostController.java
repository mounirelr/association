package ma.association.controller;

import ma.association.DTO.NewComment;
import ma.association.DTO.PostDTO;
import ma.association.DTO.PostSendDTO;
import ma.association.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping(value = "/post", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addEvent(@ModelAttribute PostDTO newPost) {

        return postService.save(newPost);

    }
    @GetMapping(value = "/posts")
    public List<PostSendDTO> getAllPosts() {
        return postService.findAll();
    }

    @DeleteMapping(value = "/deletePost/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable Long postId) {
         return postService.deleteById(postId);
    }
    @PostMapping(value = "/addPostComment")
    public ResponseEntity<String> addComment(@RequestBody NewComment newComment) {
         return postService.addComment(newComment);
    }
    @PutMapping("/likePost/{postId}/{userId}")
    public ResponseEntity<String> likePost(@PathVariable Long postId,@PathVariable Long userId){
        return postService.likePost(postId,userId);
    }

}
