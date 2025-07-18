package com.koreait.restapi.service;

import com.koreait.restapi.dto.StudyDTO;
import com.koreait.restapi.dto.StudyApplicationDTO;

import java.util.List;
import java.util.Map;

public interface StudyService {

    // 스터디 등록
    void insertStudy(StudyDTO study);

    // ✅ 스터디 수정
    void updateStudy(StudyDTO study);

    // 전체 목록 조회 (페이징)
    Map<String, Object> getStudyList(int page, int size);


    // 총 개수
    int getStudyCount();

    // 단건 조회
    StudyDTO getStudyById(int id);

    // 검색
    List<StudyDTO> searchStudies(String keyword);

    // 내가 만든 스터디
    List<StudyDTO> getMyStudies(int memberId);

    List<StudyDTO> getMyStudiesByPaging(int memberId, int offset, int size);
    int getMyStudyCount(int memberId);

    // 신청
    boolean applyStudy(StudyApplicationDTO app); // 중복 or 초과 시 false

    // 내가 신청한 스터디
    List<StudyDTO> getAppliedStudies(int memberId);

    // StudyService.java
    List<StudyDTO> searchStudies(String keyword, int offset, int size);
    int getSearchCount(String keyword);

}
