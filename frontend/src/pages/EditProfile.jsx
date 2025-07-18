"use client"

import React, { useState, useEffect, useMemo } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getUserInfo, updateUser, logoutUser } from "../api/member"
import "./EditProfile.css"
import "./globals.css"

export default function EditProfile() {
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const token = useMemo(() => localStorage.getItem("token"), [])

  useEffect(() => {
    getUserInfo(token)
      .then((res) => {
        setUser(res)
        setName(res.name)
      })
      .catch(() => setMessage("사용자 정보를 불러오지 못했습니다. 😵‍💫"))
  }, [token])

  const handleUpdate = async () => {
    if (!name.trim()) {
      setMessage("이름을 입력해주세요.")
      return
    }

    setIsSubmitting(true)
    setMessage("")

    try {
      const updateData = { name: name.trim() }
      if (password.trim()) {
        updateData.password = password.trim()
      }

      await updateUser(updateData, token)
      setMessage("회원정보가 수정되었습니다 😎")

      // 2초 후 마이페이지로 이동
      setTimeout(() => {
        navigate("/mypage")
      }, 2000)
    } catch (e) {
      setMessage("수정 실패 🤦‍♀️")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = async () => {
    if (!window.confirm("정말 로그아웃 하시겠습니까?")) return

    try {
      await logoutUser(token)
      localStorage.removeItem("token")
      navigate("/login")
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error)
      // 토큰이 유효하지 않더라도 로컬에서 제거하고 로그인 페이지로 이동
      localStorage.removeItem("token")
      navigate("/login")
    }
  }

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">로딩중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-content">
        <div className="edit-profile-card">
          {/* 헤더 섹션 */}
          <div className="edit-profile-header">
            <h2 className="edit-profile-title">회원정보 수정</h2>
            <p className="edit-profile-subtitle">프로필 정보를 업데이트하세요</p>
          </div>

          {/* 폼 섹션 */}
          <div className="edit-profile-form">
            <div className="form-group">
              <label className="form-label">아이디</label>
              <div className="readonly-field">{user.username}</div>
            </div>

            <div className="form-group">
              <label className="form-label">비밀번호</label>
              <div className="input-group">
                <span className="input-icon">🔐</span>
                <input
                  className="form-input with-icon password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="새 비밀번호 (변경시에만 입력)"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">이름</label>
              <div className="input-group">
                <span className="input-icon">👤</span>
                <input
                  className={`form-input with-icon name-input ${
                    name.trim() ? "valid" : name.length > 0 ? "invalid" : ""
                  }`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력하세요"
                />
              </div>
            </div>
          </div>

          {/* 메시지 */}
          {message && (
            <div
              className={`message ${message.includes("실패") || message.includes("못했습니다") ? "error" : "success"}`}
            >
              {message}
            </div>
          )}

          {/* 액션 버튼들 */}
          <div className="form-actions">
            <button
              className="action-button update-button"
              onClick={handleUpdate}
              disabled={isSubmitting || !name.trim()}
            >
              {isSubmitting ? "수정 중..." : "수정하기"}
            </button>
            <button className="action-button logout-button" onClick={handleLogout} disabled={isSubmitting}>
              로그아웃
            </button>
          </div>

          {/* 네비게이션 */}
          <div className="navigation-section">
            <Link to="/mypage" className="nav-link">
              마이페이지
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
