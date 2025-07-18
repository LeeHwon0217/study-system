---

## 📄 `README.md`

````markdown
# 📝 Study-System (스터디 모집 게시판)

본 프로젝트는 스터디를 개설하고 신청할 수 있는 웹 애플리케이션입니다.  
사용자는 회원가입 및 로그인 후 스터디를 개설하거나, 다른 사용자의 스터디에 신청할 수 있습니다.

---

## 🔧 기술 스택

### Backend
- Java 17
- Spring Boot 3.5.0
- MyBatis
- MySQL
- Spring Security (세션 기반 인증)
- Gradle

### Frontend
- React (Vite)
- Axios
- React Router DOM

---

## 📌 주요 기능

### 1. 회원 기능
- 회원가입
- 로그인 / 로그아웃 (Spring Security + 세션)
- 마이페이지: 내가 만든 스터디, 신청한 스터디 목록 확인

### 2. 스터디 모집 게시판
- 스터디 개설 (제목, 설명, 모집 인원, 마감일)
- 전체 스터디 목록 조회 (페이징 처리)
- 게시글 검색 (제목 + 내용 포함)
- 스터디 상세 보기 (모달 팝업)
- 본인만 수정 / 삭제 가능

### 3. 스터디 신청 기능
- 로그인한 사용자만 신청 가능
- 동일한 스터디에는 한 번만 신청 가능
- 모집 정원 초과 시 신청 불가
- 신청 내역은 마이페이지에서 확인 가능

---

## 🔐 Spring Security 설정

- 비밀번호는 BCrypt로 암호화 저장
- 인증된 사용자만 접근 가능한 경로:
  - `/study/write`
  - `/study/apply`
  - `/mypage`, `/study/mine`, `/study/applied` 등
- 비로그인 사용자는 로그인 페이지로 리다이렉트

---

## 🛠 실행 방법

### ✅ 1. Backend 서버 실행

```bash
cd backend
./gradlew bootRun
````

> `application.properties` 또는 `.env`는 `.gitignore`로 제외되어 있습니다.
> 다음 정보를 직접 설정해주세요:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/study_db
spring.datasource.username=your_username
spring.datasource.password=your_password
jwt.secret=your_jwt_secret
```

### ✅ 2. Frontend 서버 실행

```bash
cd frontend
npm install
npm run dev
```

* 기본 실행 주소: [http://localhost:5173](http://localhost:5173)

---

## 📁 프로젝트 구조

```
📦study-system
├── backend
│   ├── src/main/java/com/koreait/restapi
│   │   ├── controller
│   │   ├── service
│   │   ├── mapper
│   │   └── dto
│   ├── resources/mapper
│   │   ├── MemberMapper.xml
│   │   └── StudyMapper.xml
│   └── resources/database.sql
│
├── frontend
│   ├── src/components
│   ├── src/api
│   └── src/pages
│
├── .gitignore
├── README.md
└── database.sql
```

---

## ⚠️ 주의 사항

* `.gitignore`에는 `application.properties`, `.env`, `node_modules/`, `build/` 등 민감한 파일 제외 처리됨
* `database.sql` 파일 포함

---

## 👨‍💻 개발자

* 이 프로젝트는 **2025년 시험 과제**로 제출되었습니다.
* 개발자: [이름 또는 GitHub ID](https://github.com/your-profile)

```
