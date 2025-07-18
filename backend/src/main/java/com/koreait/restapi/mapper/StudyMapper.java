package com.koreait.restapi.mapper;

import com.koreait.restapi.dto.StudyDTO;
import com.koreait.restapi.dto.StudyApplicationDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface StudyMapper {

    // 스터디 생성
    void insertStudy(StudyDTO study);

    // 전체 목록 (페이징)
    List<StudyDTO> getStudyList(int offset, int size);

    // 총 개수
    int getStudyCount();

    // 상세 보기
    StudyDTO getStudyById(int id);

    // 검색 (제목 + 작성자)
    List<StudyDTO> searchStudies(String keyword);

    // 내가 만든 스터디
    List<StudyDTO> getStudiesByWriterId(int writerId);

    // 신청
    void applyStudy(StudyApplicationDTO app);

    // 중복 신청 확인
    int countApplication(int studyId, int memberId);

    // 신청한 스터디 목록
    List<StudyDTO> getAppliedStudiesByMemberId(int memberId);

    // 모집 인원 초과 확인용
    int countApplicants(int studyId);

    void updateStudy(StudyDTO study);

    List<StudyDTO> getMyStudiesByPaging(@Param("memberId") int memberId,
                                        @Param("offset") int offset,
                                        @Param("size") int size);
    int getMyStudyCount(@Param("memberId") int memberId);

    List<StudyDTO> searchStudies(@Param("keyword") String keyword,
                                 @Param("offset") int offset,
                                 @Param("size") int size);

    int getSearchCount(@Param("keyword") String keyword);

}
