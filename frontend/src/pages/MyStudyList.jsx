"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import "./MystudyList.css"
import "./globals.css"

export default function MyStudyList() {
  const [studies, setStudies] = useState([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const token = localStorage.getItem("token")
  const size = 5 // 페이지당 스터디 수

  useEffect(() => {
    const fetchMyStudies = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`/api/study/my?page=${page}&size=${size}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        })

        // ✅ 응답이 { content: [...], totalCount: 숫자 } 구조라고 가정
        setStudies(res.data.content)
        setTotalCount(res.data.totalCount)
      } catch (err) {
        console.error(err)
        setError("❌ 내가 개설한 스터디를 불러오지 못했습니다.")
        setStudies([])
      } finally {
        setLoading(false)
      }
    }

    fetchMyStudies()
  }, [page])

  const totalPages = Math.ceil(totalCount / size)

  return (
    <div className="board-container">
      <div className="board-header">
        <h2 className="board-title">📋 내가 개설한 스터디 목록</h2>
      </div>

      {loading ? (
        <div className="loading-indicator">불러오는 중...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : studies.length === 0 ? (
        <div className="empty-state">개설한 스터디가 없습니다.</div>
      ) : (
        <>
          <ul className="posts-list">
            {studies.map((study) => (
              <li key={study.id} className="post-item">
                <h3 className="post-title">{study.title}</h3>
                <div className="post-meta">
                  <span>모집 인원: {study.maxMembers}</span>
                  <span>마감일: {new Date(study.deadline).toLocaleDateString()}</span>
                </div>
                <p className="post-content">{study.description}</p>
              </li>
            ))}
          </ul>

          {/* ✅ 페이지네이션 */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                disabled={page === i + 1}
                className={page === i + 1 ? "active-page" : ""}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
