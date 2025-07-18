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
public class StudyApplicationDTO {
    private int id;
    private int memberId;
    private int studyId;
    private Timestamp appliedAt;
}
