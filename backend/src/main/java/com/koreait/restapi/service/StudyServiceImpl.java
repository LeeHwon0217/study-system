package com.koreait.restapi.service;

import com.koreait.restapi.dto.StudyDTO;
import com.koreait.restapi.dto.StudyApplicationDTO;
import com.koreait.restapi.mapper.StudyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StudyServiceImpl implements StudyService {

    private final StudyMapper studyMapper;

    @Override
    public void insertStudy(StudyDTO study) {
        studyMapper.insertStudy(study);
    }

    @Override
    public void updateStudy(StudyDTO study) {
        studyMapper.updateStudy(study);
    }

    @Override
    public List<StudyDTO> getMyStudiesByPaging(int memberId, int offset, int size) {
        return studyMapper.getMyStudiesByPaging(memberId, offset, size);
    }

    @Override
    public int getMyStudyCount(int memberId) {
        return studyMapper.getMyStudyCount(memberId);
    }

    // StudyServiceImpl.java
    @Override
    public List<StudyDTO> searchStudies(String keyword, int offset, int size) {
        return studyMapper.searchStudies(keyword, offset, size);
    }

    @Override
    public int getSearchCount(String keyword) {
        return studyMapper.getSearchCount(keyword);
    }


    @Override
    public Map<String, Object> getStudyList(int page, int size) {
        int offset = (page - 1) * size;
        List<StudyDTO> studies = studyMapper.getStudyList(offset, size);
        int totalCount = studyMapper.getStudyCount();

        Map<String, Object> result = new HashMap<>();
        result.put("content", studies);      // 스터디 목록
        result.put("totalCount", totalCount); // 전체 개수
        return result;
    }


    @Override
    public int getStudyCount() {
        return studyMapper.getStudyCount();
    }

    @Override
    public StudyDTO getStudyById(int id) {
        return studyMapper.getStudyById(id);
    }

    @Override
    public List<StudyDTO> searchStudies(String keyword) {
        return studyMapper.searchStudies(keyword);
    }

    @Override
    public List<StudyDTO> getMyStudies(int memberId) {
        return studyMapper.getStudiesByWriterId(memberId);
    }

    @Override
    public boolean applyStudy(StudyApplicationDTO app) {
        int duplicate = studyMapper.countApplication(app.getStudyId(), app.getMemberId());
        int current = studyMapper.countApplicants(app.getStudyId());
        int max = studyMapper.getStudyById(app.getStudyId()).getMaxMembers();

        if (duplicate > 0 || current >= max) {
            return false;
        }

        studyMapper.applyStudy(app);
        return true;
    }

    @Override
    public List<StudyDTO> getAppliedStudies(int memberId) {
        return studyMapper.getAppliedStudiesByMemberId(memberId);
    }
}
