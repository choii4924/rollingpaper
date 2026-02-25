# Supabase 설정 가이드

롤링페이퍼 앱을 Supabase에 연결하기 위한 설정 가이드입니다.

---

## 1. Supabase 프로젝트 생성

1. [https://supabase.com](https://supabase.com) 접속 후 로그인
2. **New Project** 클릭
3. 프로젝트 이름: `rollingpaper` (자유)
4. 리전: `Northeast Asia (Seoul)` 권장
5. 비밀번호 설정 후 프로젝트 생성

---

## 2. 테이블 생성

Supabase 대시보드에서 **SQL Editor**로 이동하여 아래 SQL을 실행합니다.

### messages 테이블

```sql
DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  author VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

> `created_at`을 사용하여 기존 `date` 필드를 대체합니다.

---

## 3. RLS (Row Level Security) 설정

Supabase는 기본적으로 RLS가 활성화되어 있습니다. 아래 정책을 추가해야 데이터 접근이 가능합니다.

```sql
-- RLS 활성화 (기본 활성화되어 있지만 확인)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 누구나 메시지 조회 가능
CREATE POLICY "messages_select_policy"
  ON messages
  FOR SELECT
  TO anon
  USING (true);

-- 누구나 메시지 작성 가능
CREATE POLICY "messages_insert_policy"
  ON messages
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

> 롤링페이퍼 특성상 로그인 없이 메시지를 남길 수 있도록 `anon` 역할에 SELECT/INSERT 권한을 부여합니다.
> DELETE, UPDATE 정책은 추가하지 않아 메시지 수정/삭제가 불가능합니다.

---

## 4. API 키 확인

Supabase 대시보드 → **Settings** → **API** 에서 아래 두 값을 확인합니다.

| 항목 | 설명 |
|---|---|
| **Project URL** | `https://xxxxxxxxxx.supabase.co` 형태 |
| **anon public key** | `eyJhbGci...` 형태의 JWT 토큰 |

---

## 5. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 위에서 확인한 값을 입력합니다.

```env
VITE_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...여기에_anon_key_입력
```

> ⚠️ `.env` 파일은 `.gitignore`에 이미 포함되어 있어 Git에 커밋되지 않습니다.
> Vite에서는 `VITE_` 접두사가 붙은 환경 변수만 클라이언트에 노출됩니다.

---

## 6. 전체 SQL 요약 (한번에 실행)

SQL Editor에서 아래를 한번에 복사하여 실행하면 됩니다.

```sql
-- 1. 테이블 생성
DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  author VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RLS 활성화
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 3. 조회 정책
CREATE POLICY "messages_select_policy"
  ON messages
  FOR SELECT
  TO anon
  USING (true);

-- 4. 삽입 정책
CREATE POLICY "messages_insert_policy"
  ON messages
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

---

## 초기 작업

Supabase 프로젝트 생성 후 아래 순서대로 진행합니다.

### 1. SQL 실행

Supabase 대시보드 → **SQL Editor**에서 위 [6. 전체 SQL 요약](#6-전체-sql-요약-한번에-실행) 섹션의 SQL을 복사하여 실행합니다.

### 2. `.env` 파일 생성

프로젝트 루트에 `.env` 파일을 생성합니다.

```env
VITE_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...여기에_anon_key_입력
```

- **Project URL**, **anon public key**는 Supabase 대시보드 → **Settings** → **API**에서 확인

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 페이지 접속 후 메시지 작성/조회가 정상 동작하는지 확인합니다.
