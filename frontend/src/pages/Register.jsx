"use client"

import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { registerUser } from "../api/member"
import "./Register.css"
import "./globals.css"

export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  // 유효성 검사 함수들
  const validateUsername = (value) => {
    return value.length >= 3 && /^[a-zA-Z0-9_]+$/.test(value)
  }

  const validatePassword = (value) => {
    return value.length >= 6
  }

  const validateName = (value) => {
    return value.trim().length >= 2
  }

  const getPasswordStrength = (password) => {
    if (password.length < 6) return "weak"
    if (password.length < 10) return "medium"
    return "strong"
  }

  const isFormValid = validateUsername(username) && validatePassword(password) && validateName(name)

  const handleRegister = async () => {
    if (!isFormValid) {
      setMessage("모든 필드를 올바르게 입력해주세요.")
      return
    }

    setIsSubmitting(true)
    setMessage("")

    try {
      await registerUser({
        username: username.trim(),
        password: password.trim(),
        name: name.trim(),
      })
      setMessage("회원가입 성공 😎")

      // 2초 후 로그인 페이지로 이동
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (e) {
      setMessage("회원가입 실패 🤦‍♀️")
    } finally {
      setIsSubmitting(false)
    }
  }

  const passwordStrength = getPasswordStrength(password)

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">회원가입</h2>

        {/* 유효성 검사 요약 */}
        <div className="validation-summary">
          <div className="validation-title">입력 요구사항</div>
          <ul className="validation-list">
            <li className={`validation-item ${validateUsername(username) ? "valid" : "invalid"}`}>
              아이디: 3자 이상, 영문/숫자/언더스코어만
            </li>
            <li className={`validation-item ${validatePassword(password) ? "valid" : "invalid"}`}>
              비밀번호: 6자 이상
            </li>
            <li className={`validation-item ${validateName(name) ? "valid" : "invalid"}`}>이름: 2자 이상</li>
          </ul>
        </div>

        <div className="form-group">
          <label className="form-label username">아이디</label>
          <input
            className={`form-input ${username ? (validateUsername(username) ? "valid" : "invalid") : ""}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디를 입력하세요"
          />
          {username && (
            <div className={`input-hint ${validateUsername(username) ? "valid" : "invalid"}`}>
              {validateUsername(username) ? "사용 가능한 아이디입니다" : "3자 이상, 영문/숫자/언더스코어만 사용"}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label password">비밀번호</label>
          <input
            className={`form-input ${password ? (validatePassword(password) ? "valid" : "invalid") : ""}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />
          {password && (
            <>
              <div className="password-strength">
                <div className="strength-bar">
                  <div className={`strength-fill ${passwordStrength}`}></div>
                </div>
                <div className={`strength-text ${passwordStrength}`}>
                  {passwordStrength === "weak" && "약함"}
                  {passwordStrength === "medium" && "보통"}
                  {passwordStrength === "strong" && "강함"}
                </div>
              </div>
              <div className={`input-hint ${validatePassword(password) ? "valid" : "invalid"}`}>
                {validatePassword(password) ? "안전한 비밀번호입니다" : "6자 이상 입력해주세요"}
              </div>
            </>
          )}
        </div>

        <div className="form-group">
          <label className="form-label name">이름</label>
          <input
            className={`form-input ${name ? (validateName(name) ? "valid" : "invalid") : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
          {name && (
            <div className={`input-hint ${validateName(name) ? "valid" : "invalid"}`}>
              {validateName(name) ? "올바른 이름입니다" : "2자 이상 입력해주세요"}
            </div>
          )}
        </div>

        <button
          className={`register-button ${isSubmitting ? "loading" : ""}`}
          onClick={handleRegister}
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? "가입 중..." : "회원가입"}
        </button>

        {message && <div className={`message ${message.includes("실패") ? "error" : "success"}`}>{message}</div>}

        <div className="login-link">
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </div>
      </div>
    </div>
  )
}
