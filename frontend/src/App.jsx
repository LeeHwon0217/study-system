import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Mypage from "./pages/Mypage";
import EditProfile from './pages/EditProfile';
import Study from "./pages/StudyList";
import StudyWrite from "./pages/StudyWrite";

// ⬇️ 꼭 import 추가하세요!
import MyStudyList from "./pages/MyStudyList";
import AppliedStudyList from "./pages/AppliedStudyList";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/editProfile" element={<EditProfile />} />

      {/* ✅ 스터디 관련 라우트 전체 추가 */}
      <Route path="/study" element={<Study />} />
      <Route path="/study/write" element={<StudyWrite />} />
      <Route path="/study/mine" element={<MyStudyList />} />
      <Route path="/study/applied" element={<AppliedStudyList />} />
    </Routes>
  );
}
