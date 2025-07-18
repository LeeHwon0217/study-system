package com.koreait.restapi.controller;

import com.koreait.restapi.dto.PostDTO;
import com.koreait.restapi.jwt.JwtUtil;
import com.koreait.restapi.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final JwtUtil jwtUtil;
    private final PostService postService;

    // 게시글 작성
    @PostMapping
    public ResponseEntity<?> create(@RequestBody PostDTO post, HttpServletRequest request) {
        int userId = jwtUtil.getUserIdFromRequest(request);
        post.setWriterId(userId);
        postService.insertPost(post);
        return ResponseEntity.ok().build();
    }

    // 게시글 목록 조회 (페이징)
    @GetMapping
    public List<PostDTO> list(@RequestParam(defaultValue = "1") int page,
                              @RequestParam(defaultValue = "10") int size) {
        return postService.getPosts(page, size);
    }

    // ✅ 게시글 단건 조회
    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPost(@PathVariable int id) {
        PostDTO post = postService.getPostById(id);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(post);
    }

    // 게시글 수정 (작성자 본인만)
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id,
                                    @RequestBody PostDTO post,
                                    HttpServletRequest request) {
        int userId = jwtUtil.getUserIdFromRequest(request);
        post.setId(id);
        post.setWriterId(userId);
        postService.updatePost(post);
        return ResponseEntity.ok().build();
    }

    // 게시글 삭제 (작성자 본인만)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id,
                                    HttpServletRequest request) {
        int userId = jwtUtil.getUserIdFromRequest(request);
        postService.deletePost(id, userId);
        return ResponseEntity.ok().build();
    }
}
