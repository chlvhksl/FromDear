-- FromDear 데이터베이스 스키마 설정

-- users 테이블 생성
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- messages 테이블 생성
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_opened BOOLEAN DEFAULT FALSE,
  opened_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_is_opened ON messages(user_id, is_opened);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Row Level Security (RLS) 정책 설정

-- users 테이블: 자신의 정보만 읽기 가능
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- messages 테이블: 
-- 1. 누구나 메시지 작성 가능 (익명)
-- 2. 자신의 메시지만 읽기 가능
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert messages"
  ON messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can read own messages"
  ON messages FOR SELECT
  USING (auth.uid() = user_id);

-- users 테이블에 메시지 작성도 허용 (익명 사용자를 위해)
-- 실제로는 애플리케이션 레벨에서 처리하거나, 서비스 역할 키 사용

