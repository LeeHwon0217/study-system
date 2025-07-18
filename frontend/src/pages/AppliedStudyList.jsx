"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import "./AppliedStudyList.css"
import "./globals.css"

export default function AppliedStudyList() {
  const [studies, setStudies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchAppliedStudies = async () => {
      try {
        const res = await axios.get("/api/study/applied", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setStudies(res.data)
      } catch (err) {
        console.error(err)
        setError("❌ 신청한 스터디 목록을 불러오지 못했습니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchAppliedStudies()
  }, [token])

  return (
    <div className="board-container">
      <div className="board-header">
        <h2 className="board-title">내가 신청한 스터디 목록</h2>
      </div>

      {loading ? (
        <div className="loading-indicator">불러오는 중...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : studies.length === 0 ? (
        <div className="empty-state">신청한 스터디가 없습니다.</div>
      ) : (
        <ul className="posts-list">
          {studies.map((study) => (
            <li key={study.id} className="post-item">
              <h3 className="post-title">{study.title}</h3>
              <div className="post-meta">
                <span>모집 인원: {study.capacity}</span>
                <span>마감일: {new Date(study.deadline).toLocaleDateString()}</span>
              </div>
              <p className="post-content">{study.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
