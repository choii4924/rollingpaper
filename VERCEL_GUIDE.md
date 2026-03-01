# Vercel 배포 가이드

롤링페이퍼 앱(Vite + React + TypeScript)을 **Fork**하여 자신만의 롤링페이퍼를 만들고, Vercel에 배포하기 위한 가이드입니다.

---

## 사전 준비

배포 전에 아래 항목이 준비되어 있어야 합니다.

| 항목 | 설명 |
|---|---|
| **GitHub 계정** | [github.com](https://github.com) 에서 회원가입 |
| **Vercel 계정** | [vercel.com](https://vercel.com) 에서 회원가입 (GitHub 연동 권장) |
| **Supabase 환경 변수** | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 값 |

---

## 1단계: 저장소 Fork & 내용 수정

### 1-1. 저장소 Fork

1. 원본 저장소 페이지로 이동
2. 우측 상단의 **"Fork"** 버튼 클릭
3. 자신의 GitHub 계정으로 Fork 완료

### 1-2. 내용 수정

Fork한 저장소를 로컬에 클론하여 원하는 내용을 수정합니다.

```bash
git clone https://github.com/<내 계정>/rollingpaper.git
cd rollingpaper
npm install
```

수정할 수 있는 항목 예시:

| 파일 | 수정 내용 |
|---|---|
| `src/components/ProfileHeader/` | 프로필 이름, 소개 문구 변경 |
| `index.html` | 페이지 제목(`<title>`), 설명(`<meta>`) 변경 |
| `src/App.css`, `src/index.css` | 색상, 폰트 등 스타일 커스터마이징 |

수정 완료 후 커밋 & 푸시합니다.

```bash
git add .
git commit -m "커스터마이징 완료"
git push
```

> [!IMPORTANT]
> `.env` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다. Supabase 키가 공개 저장소에 노출되지 않도록 주의하세요.

---

## 2단계: Vercel에 프로젝트 연결

1. [vercel.com](https://vercel.com)에 로그인
2. 대시보드에서 **"Add New..."** → **"Project"** 클릭
3. **"Import Git Repository"** 에서 GitHub 계정을 연동하고, Fork한 `rollingpaper` 저장소 선택
4. **"Import"** 클릭

---

## 3단계: 빌드 설정 확인

Vercel은 Vite 프로젝트를 자동으로 감지합니다. 아래 설정이 자동 적용되지만, 확인해 두세요.

| 설정 항목 | 값 |
|---|---|
| **Framework Preset** | `Vite` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

> [!NOTE]
> 기본값이 올바르게 설정되어 있다면 별도로 수정할 필요가 없습니다.

---

## 4단계: 환경 변수 설정 ⚠️

> [!CAUTION]
> 이 단계를 빠뜨리면 Supabase 연동이 동작하지 않습니다!

### 배포 시 설정 (Import 화면)

**"Environment Variables"** 섹션에서 아래 두 변수를 추가합니다.

| Key | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://xxxxxxxxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGci...` (anon public key) |

각 변수에 대해:

1. **Key** 입력란에 변수 이름 입력
2. **Value** 입력란에 실제 값 입력
3. **Environment** : `Production`, `Preview`, `Development` 모두 체크 (기본값)
4. **Add** 클릭

### 기존 프로젝트에서 나중에 추가/수정하는 경우

1. Vercel 대시보드 → 해당 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 변수 추가 또는 수정 후 저장
4. **⚠️ 반드시 Redeploy** 해야 변경사항이 적용됩니다

> [!TIP]
> Supabase 키 값은 Supabase 대시보드 → **Settings** → **API**에서 확인할 수 있습니다.
> 자세한 내용은 [SUPABASE_GUIDE.md](./SUPABASE_GUIDE.md)의 4번 섹션을 참고하세요.

---

## 5단계: 배포

1. 환경 변수 설정 완료 후 **"Deploy"** 버튼 클릭
2. 빌드 로그에서 진행 상황 확인
3. 배포 완료 시 `https://rollingpaper-xxxx.vercel.app` 형태의 URL이 생성됩니다

---

## 6단계: 커스텀 도메인 설정 (선택)

자신만의 도메인을 연결하고 싶다면:

1. Vercel 대시보드 → 프로젝트 → **Settings** → **Domains**
2. 도메인 입력 (예: `rolling.example.com`)
3. **Add** 클릭
4. 표시되는 DNS 레코드를 도메인 등록 업체에서 설정

| 레코드 타입 | 호스트 | 값 |
|---|---|---|
| **CNAME** | `rolling` | `cname.vercel-dns.com` |
| 또는 **A** | `@` | `76.76.21.21` |

> [!NOTE]
> 설정 후 SSL 인증서가 자동으로 발급됩니다 (보통 수 분 이내).

---

## 배포 후 확인 사항

### ✅ 체크리스트

- [ ] 배포된 URL 접속 시 페이지가 정상 표시되는가?
- [ ] 메시지 작성이 정상 동작하는가?
- [ ] 메시지 목록이 정상 조회되는가?
- [ ] 브라우저 개발자 도구 콘솔에 Supabase 관련 오류가 없는가?

### 🔍 빌드 실패 시 점검 사항

| 증상 | 원인 & 해결 |
|---|---|
| `tsc` 타입 에러 | 로컬에서 `npm run build`로 먼저 확인 |
| Supabase 연결 실패 | 환경 변수가 올바르게 설정되었는지 확인 |
| 페이지 404 | SPA 라우팅 설정 확인 (아래 섹션 참고) |

---

## SPA 라우팅 설정 (필요 시)

현재 프로젝트에는 클라이언트 라우터가 없지만, 향후 `react-router` 등을 추가할 경우 Vercel에서 SPA fallback 설정이 필요합니다.

프로젝트 루트에 `vercel.json` 파일을 생성합니다:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

> [!NOTE]
> 이 설정은 모든 경로 요청을 `index.html`로 리다이렉트하여 클라이언트 사이드 라우팅이 정상 동작하도록 합니다.

---

## 자동 배포 (CI/CD)

Vercel에 GitHub 저장소를 연결하면 **자동 배포**가 설정됩니다.

| 이벤트 | 동작 |
|---|---|
| `main` 브랜치에 push | **프로덕션 배포** 자동 실행 |
| PR(Pull Request) 생성 | **프리뷰 배포** 자동 생성 (고유 URL 제공) |
| PR에 추가 커밋 | 프리뷰 배포 자동 업데이트 |

> [!TIP]
> 프리뷰 배포 URL을 활용하면 코드 리뷰 시 실제 동작을 바로 확인할 수 있어 매우 편리합니다.

---

## 수동 재배포 방법

환경 변수를 변경했거나 강제 재배포가 필요한 경우:

1. Vercel 대시보드 → 프로젝트 → **Deployments** 탭
2. 가장 최근 배포의 **⋮** (점 세 개) 메뉴 클릭
3. **"Redeploy"** 선택

또는 Vercel CLI 사용:

```bash
# Vercel CLI 설치 (최초 1회)
npm i -g vercel

# 배포
vercel --prod
```

---

## 전체 배포 흐름 요약

```
1. 원본 저장소를 Fork
        ↓
2. 내용 수정 (프로필, 제목 등) & Push
        ↓
3. Vercel에서 Fork한 저장소 Import
        ↓
4. 빌드 설정 확인 (Vite 자동 감지)
        ↓
5. 환경 변수 설정
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
        ↓
6. Deploy 클릭
        ↓
7. 배포 URL 확인 & 동작 테스트
        ↓
8. (선택) 커스텀 도메인 연결
```

---

## 참고 링크

- [Vercel 공식 문서](https://vercel.com/docs)
- [Vercel + Vite 가이드](https://vercel.com/docs/frameworks/vite)
- [Supabase 환경 변수 설정](./SUPABASE_GUIDE.md)
