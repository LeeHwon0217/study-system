"use client"

import React, { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { createStudy, getStudyById, updateStudy } from "../api/study"
import "./StudyWrite.css"
import "./globals.css"

export default function StudyWrite() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [maxParticipants, setMaxParticipants] = useState("")
  const [deadline, setDeadline] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchParams] = useSearchParams()
  const studyId = searchParams.get("id")
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const isEditMode = Boolean(studyId)

  useEffect(() => {
    if (!studyId) return

    const fetchStudy = async () => {
      setLoading(true)
      try {
        const res = await getStudyById(studyId)
        setTitle(res.title)
        setDescription(res.description)
        setMaxParticipants(res.maxParticipants)
        setDeadline(res.deadline?.slice(0, 10))
      } catch (err) {
        setMessage("❌ 스터디 정보를 불러오지 못했습니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchStudy()
  }, [studyId])

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !maxParticipants || !deadline) {
      setMessage("❌ 모든 필드를 입력해주세요.")
      return
    }

    setIsSubmitting(true)
    setMessage("")

    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        maxMembers: parseInt(maxParticipants),
        deadline,
      }

      if (isEditMode) {
        await updateStudy(studyId, payload, token)
        alert("✅ 스터디가 수정되었습니다.")
      } else {
        await createStudy(payload, token)
        alert("✅ 스터디가 개설되었습니다.")
      }

      navigate("/study")
    } catch (e) {
      setMessage(isEditMode ? "❌ 수정 실패" : "❌ 등록 실패")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="board-write-container">
      <div className="board-write-content">
        <div className="board-write-card">
          {loading && (
            <div className="loading-overlay">
              <div className="loading-content">
                <div className="loading-spinner"></div>
                정보를 불러오는 중...
              </div>
            </div>
          )}

          <div className="board-write-header">
            <h2 className={`board-write-title ${isEditMode ? "edit" : "create"}`}>
              {isEditMode ? "스터디 수정" : "스터디 개설"}
            </h2>
          </div>

          <div className="board-write-form">
            <div className="form-group">
              <label>제목</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" />
            </div>

            <div className="form-group">
              <label>설명</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="스터디 설명" />
            </div>

            <div className="form-group">
              <label>모집 인원</label>
              <input
                type="number"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
                placeholder="최대 인원"
              />
            </div>

            <div className="form-group">
              <label>마감일</label>
              <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
          </div>

          {message && <div className={`message ${message.includes("❌") ? "error" : "success"}`}>{message}</div>}

          <div className="form-actions">
            <button
              className="action-button submit-button"
              onClick={handleSubmit}
              disabled={isSubmitting || !title || !description || !maxParticipants || !deadline}
            >
              {isSubmitting ? "처리 중..." : isEditMode ? "수정" : "개설"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
