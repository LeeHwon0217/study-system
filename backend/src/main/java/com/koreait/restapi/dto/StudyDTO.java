package com.koreait.restapi.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class StudyDTO {
    private int id;
    private String title;         // 스터디 제목
    private String description;   // 설명
    private int maxMembers;       // 모집 인원
    private Timestamp deadline;   // 마감일
    private int creatorId;        // 생성자(회원 ID)
    private String creatorName;   // 생성자 이름
    private Timestamp createdAt;
}
