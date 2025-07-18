// src/api/study.js
import axios from "axios"

const BASE_URL = "/api/study"

// ✅ 스터디 등록
export const createStudy = async (study, token) => {
  const res = await axios.post(BASE_URL, study, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
  })
  return res.data
}

// ✅ 스터디 목록 조회 (페이징 포함)
export const getStudies = async (page = 1, size = 10, keyword = "") => {
  const token = localStorage.getItem("token")
  const url = `${BASE_URL}?page=${page}&size=${size}&keyword=${encodeURIComponent(keyword)}`
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
  })
  return res.data
}

// ✅ 스터디 단건 조회
export const getStudyById = async (id) => {
  const token = localStorage.getItem("token")
  const res = await axios.get(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
  })
  return res.data
}

// ✅ 스터디 수정
export const updateStudy = async (id, study, token) => {
  const res = await axios.put(`${BASE_URL}/${id}`, study, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    withCredentials: true
  })
  return res.data
}

// ✅ 스터디 삭제
export const deleteStudy = async (id, token) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
  })
  return res.data
}

// ✅ 스터디 신청
export const applyStudy = async (studyId, token) => {
  const res = await axios.post(`${BASE_URL}/${studyId}/apply`, {}, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
  })
  return res.data
}

// ✅ 내가 개설한 스터디 목록
export const getMyCreatedStudies = async () => {
  const token = localStorage.getItem("token")
  const res = await axios.get(`${BASE_URL}/mine`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
  })
  return res.data
}

// ✅ 내가 신청한 스터디 목록
export const getMyAppliedStudies = async () => {
  const token = localStorage.getItem("token")
  const res = await axios.get(`${BASE_URL}/applied`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
  })
  return res.data
}

// ✅ 게시글 검색 (제목 또는 내용)
export const searchStudies = async (keyword, page = 1, size = 6) => {
  const token = localStorage.getItem("token")
  const res = await axios.get(`/api/study/search`, {
    params: { keyword, page, size },
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
  })
  return res.data
}
