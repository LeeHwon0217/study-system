"use client"

import React, { useEffect, useState, useMemo } from "react"
import { getUserInfo, logoutUser } from "../api/member"
import { useNavigate, Link } from "react-router-dom"
import "./Mypage.css"
import "./globals.css"

const Mypage = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const token = useMemo(() => localStorage.getItem("token"), [])

  useEffect(() => {
    getUserInfo(token)
      .then((res) => setUser(res))
      .catch(() => setMessage("사용자 정보를 불러오지 못했습니다. 😵‍💫"))
  }, [token])

  const handleLogout = async () => {
    try {
      await logoutUser(token)
      localStorage.removeItem("token")
      navigate("/login")
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error)
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
    <div className="mypage-container">
      <div className="mypage-content">
        <div className="mypage-card">
          {/* 헤더 섹션 */}
          <div className="mypage-header">
            <h2 className="mypage-title">마이페이지</h2>
            <p className="mypage-subtitle">안녕하세요, {user.name}님!</p>
          </div>

          {/* 사용자 정보 섹션 */}
          <div className="user-info-section">
            <div className="user-info-grid">
              <div className="user-info-item">
                <div className="user-info-label">아이디</div>
                <p className="user-info-value">{user.username}</p>
              </div>
              <div className="user-info-item">
                <div className="user-info-label">이름</div>
                <p className="user-info-value">{user.name}</p>
              </div>
            </div>

            <button className="logout-button" onClick={handleLogout}>
              로그아웃
            </button>

            {message && <div className="error-message">{message}</div>}
          </div>

          <hr className="divider" />

          {/* 메뉴 섹션 */}
          <div className="menu-section">
            <h3 className="menu-title">메뉴</h3>
            <div className="menu-grid">
              <Link to="/editProfile" className="menu-item">
                👤 회원정보 수정
              </Link>
              <Link to="/study" className="menu-item">
                📢 스터디 모집 게시판
              </Link>
              <Link to="/study/mine" className="menu-item">
                📚 내가 만든 스터디
              </Link>
              <Link to="/study/applied" className="menu-item">
                ✋ 신청한 스터디
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mypage
