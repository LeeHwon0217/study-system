package com.koreait.restapi.service;

import com.koreait.restapi.dto.PostDTO;
import com.koreait.restapi.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostMapper postMapper;

    // 게시글 등록
    @Override
    public void insertPost(PostDTO postDTO) {
        postMapper.insertPost(postDTO);
    }

    // 게시글 목록 조회
    @Override
    public List<PostDTO> getPosts(int page, int size) {
        int offset = (page - 1) * size;
        return postMapper.getPosts(offset, size);
    }

    // ✅ 게시글 단건 조회
    @Override
    public PostDTO getPostById(int id) {
        return postMapper.getPostById(id);
    }

    // 게시글 수정
    @Override
    public void updatePost(PostDTO postDTO) {
        postMapper.updatePost(postDTO);
    }

    // 게시글 삭제
    @Override
    public void deletePost(int postId, int userId) {
        postMapper.deletePost(postId, userId);
    }
}
