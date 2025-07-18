"use client"

import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { loginUser } from "../api/member"
import "./Login.css"
import "./globals.css"

export default function Login() {
  const [username, setUsername] = useState("melon")
  const [password, setPassword] = useState("1234")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setIsLoading(true)
    setMessage("")

    try {
      const res = await loginUser(username, password)
      localStorage.setItem("token", res.token)
      localStorage.setItem("userId", res.userId)
      navigate("/mypage")
    } catch (e) {
      setMessage("로그인 실패 🤦‍♀️")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">로그인</h2>

        <div className="form-group">
          <label className="form-label">아이디</label>
          <input
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력하세요"
          />
        </div>

        <div className="form-group">
          <label className="form-label">비밀번호</label>
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <button className="login-button" onClick={handleLogin} disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </button>

        {message && <div className={`message ${message.includes("실패") ? "error" : "success"}`}>{message}</div>}

        <div className="signup-link">
          아직 회원이 아니신가요? <Link to="/register">회원가입</Link>
        </div>
      </div>
    </div>
  )
}
