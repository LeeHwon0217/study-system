"use client"

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getStudies, deleteStudy, applyStudy, searchStudies } from "../api/study"
import "./StudyList.css"
import "./globals.css"

export default function StudyList() {
  const [studies, setStudies] = useState([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selectedStudy, setSelectedStudy] = useState(null)
  const [keyword, setKeyword] = useState("")

  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const userId = Number(localStorage.getItem("userId"))
  const size = 6

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        let res
        if (keyword.trim()) {
          res = await searchStudies(keyword, page, size)
        } else {
          res = await getStudies(page, size)
        }
        setStudies(res.content)
        setTotalCount(res.totalCount)
      } catch (error) {
        console.error("스터디 목록 불러오기 실패:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [page, keyword])

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return
    try {
      await deleteStudy(id, token)
      alert("삭제 완료!")
      setStudies((prev) => prev.filter((s) => s.id !== id))
      setSelectedStudy(null)
    } catch (err) {
      alert("삭제 실패")
    }
  }

  const handleApply = async (id) => {
    try {
      await applyStudy(id, token)
      alert("신청 완료!")
    } catch (err) {
      alert("❌ 신청 실패: 중복 신청 또는 정원 초과")
    }
  }

  const totalPages = Math.ceil(totalCount / size)

  return (
    <div className="board-container">
      <div className="board-header">
        <h2 className="board-title">스터디 모집 게시판</h2>
        <button className="write-button" onClick={() => navigate("/study/write")}>
          스터디 개설
        </button>
      </div>

      {/* ✅ 검색 입력창 */}
      <div className="search-bar">
        <input
          type="text"
          value={keyword}
          onChange={(e) => {
            setPage(1)
            setKeyword(e.target.value)
          }}
          placeholder="제목 또는 내용을 검색하세요"
        />
      </div>

      {loading ? (
        <div className="loading-indicator">불러오는 중...</div>
      ) : studies.length === 0 ? (
        <div className="empty-state">스터디가 없습니다.</div>
      ) : (
        <ul className="posts-list">
          {studies.map((study) => (
            <li
              key={study.id}
              className="post-item"
              onClick={() => setSelectedStudy(study)}
            >
              <h3 className="post-title">{study.title}</h3>
              <div className="post-meta">
                <span>{study.creatorName}</span>
                <span>모집인원: {study.maxMembers}</span>
                <span>마감일: {new Date(study.deadline).toLocaleDateString()}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* ✅ 페이지네이션 */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active-page" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* ✅ 모달 */}
      {selectedStudy && (
        <div className="modal-overlay" onClick={() => setSelectedStudy(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedStudy.title}</h3>
            <p>{selectedStudy.description}</p>
            <p>모집인원: {selectedStudy.maxMembers}</p>
            <p>마감일: {new Date(selectedStudy.deadline).toLocaleDateString()}</p>

            <div className="modal-actions">
              {userId === selectedStudy.creatorId ? (
                <>
                  <button
                    className="modal-button edit-button"
                    onClick={() => navigate(`/study/write?id=${selectedStudy.id}`)}
                  >
                    수정
                  </button>
                  <button
                    className="modal-button delete-button"
                    onClick={() => handleDelete(selectedStudy.id)}
                  >
                    삭제
                  </button>
                </>
              ) : (
                <button
                  className="modal-button apply-button"
                  onClick={() => handleApply(selectedStudy.id)}
                >
                  신청
                </button>
              )}
              <button
                className="modal-button close-button"
                onClick={() => setSelectedStudy(null)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
