package ma.association.repository;

import ma.association.model.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository  extends JpaRepository<PostLike, Long> {
    Optional<PostLike> findByPost_Id(Long postId);
}
