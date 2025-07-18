package com.koreait.restapi.service;

import com.koreait.restapi.dto.PostDTO;

import java.util.List;

public interface PostService {

    // 게시글 등록
    void insertPost(PostDTO postDTO);

    // 게시글 목록 조회
    List<PostDTO> getPosts(int page, int size);

    // 게시글 단건 조회
    PostDTO getPostById(int id);  // ✅ 추가된 메서드

    // 게시글 수정 (작성자 본인만)
    void updatePost(PostDTO postDTO);

    // 게시글 삭제 (작성자 본인만)
    void deletePost(int postId, int userId);
}
