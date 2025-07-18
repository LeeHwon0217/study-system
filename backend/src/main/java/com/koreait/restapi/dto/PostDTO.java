package com.koreait.restapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
    private int id;
    private String title;
    private String content;
    private int writerId;
    private String writerName;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String thumbnailUrl;
}
