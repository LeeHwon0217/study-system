<<<<<<< Updated upstream
-- ===============================
-- 📁 database.sql
-- 스터디 시스템 DB 테이블 생성 및 초기 데이터
-- ===============================

-- 1. 회원 테이블
CREATE TABLE member (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        username VARCHAR(50) NOT NULL UNIQUE,
                        password VARCHAR(255) NOT NULL,
                        name VARCHAR(50) NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. 스터디 테이블
CREATE TABLE study (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       title VARCHAR(100) NOT NULL,
                       description TEXT NOT NULL,
                       max_members INT NOT NULL,
                       deadline DATE NOT NULL,
                       creator_id INT NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       FOREIGN KEY (creator_id) REFERENCES member(id) ON DELETE CASCADE
);

-- 3. 스터디 신청 테이블
CREATE TABLE study_application (
                                   id INT AUTO_INCREMENT PRIMARY KEY,
                                   member_id INT NOT NULL,
                                   study_id INT NOT NULL,
                                   applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                   UNIQUE KEY unique_application (member_id, study_id),
                                   FOREIGN KEY (member_id) REFERENCES member(id) ON DELETE CASCADE,
                                   FOREIGN KEY (study_id) REFERENCES study(id) ON DELETE CASCADE
);

-- ✅ 초기 회원 (테스트용)
INSERT INTO member (username, password, name)
VALUES ('testuser', '$2a$10$QX.ZWyqWxgQ2CVptzpE9keidgso2EVJYzF7UZYYGAcKHOvIm3hFMq', '홍길동');
-- 비밀번호: 1234 (BCrypt 암호화)

-- ✅ 초기 스터디 (테스트용)
INSERT INTO study (title, description, max_members, deadline, creator_id)
VALUES ('스프링 입문 스터디', '스프링 부트를 처음 배우는 사람들을 위한 스터디입니다.', 5, '2025-08-31', 1);

-- ✅ 초기 신청 (테스트용)
INSERT INTO study_application (member_id, study_id)
VALUES (1, 1);
