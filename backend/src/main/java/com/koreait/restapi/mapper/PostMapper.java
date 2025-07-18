package com.koreait.restapi.mapper;

import com.koreait.restapi.dto.PostDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostMapper {

    // 게시글 등록
    void insertPost(PostDTO post);

    // 게시글 목록 조회 (페이징)
    List<PostDTO> getPosts(@Param("offset") int offset, @Param("limit") int limit);

    // 게시글 단건 조회
    PostDTO getPostById(@Param("id") int id);  // ✅ 추가된 부분

    // 게시글 수정 (작성자 본인만 가능)
    void updatePost(PostDTO post);

    // 게시글 삭제 (작성자 본인만 가능)
    void deletePost(@Param("id") int id, @Param("userId") int userId);
}
