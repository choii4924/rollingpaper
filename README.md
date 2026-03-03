# 롤링페이퍼 🎉

따뜻한 메시지를 남기는 롤링페이퍼 웹 애플리케이션입니다.

## 기술 스택

- React 19 + TypeScript
- Vite 7
- Vanilla CSS

## 실행 방법

```bash
npm install
npm run dev
```

## 📁 파일 구조

```
src/
├── types/
│   └── Message.ts              # Message 인터페이스 타입 정의
├── components/
│   ├── ProfileHeader/
│   │   ├── ProfileHeader.tsx    # 상단 프로필 컴포넌트
│   │   └── ProfileHeader.css
│   ├── MessageForm/
│   │   ├── MessageForm.tsx      # 메시지 남기기 폼 컴포넌트
│   │   └── MessageForm.css
│   └── MessageList/
│       ├── MessageList.tsx      # 받은 메시지 목록 컴포넌트
│       └── MessageList.css
├── App.tsx                      # 3개 컴포넌트 조합
├── App.css                      # 레이아웃 스타일
├── index.css                    # Noto Sans KR 폰트, 글로벌 리셋
└── main.tsx
index.html                       # 한국어 설정, 메타 태그
```

## 🧩 컴포넌트 설명

| 컴포넌트 | 역할 |
|---|---|
| **`ProfileHeader`** | `핑크~보라~블루` 그라디언트 배경의 프로필 영역. 아바타 아이콘, 이름, `롤링페이퍼` 배지, 환영 메시지 표시 |
| **`MessageForm`** | 작성자 입력, 메시지 텍스트에어리어, `메시지 보내기` 버튼. 전송 시 메시지 목록에 실시간 추가 |
| **`MessageList`** | 받은 메시지를 파스텔 색상 카드 그리드로 표시. 카드별 작성자, 내용, 날짜 포함. 메시지 없을 때 빈 상태 UI 제공 |

## ✨ 디자인 포인트

- **Noto Sans KR** 한국어 폰트 적용
- 프로필 영역 **핑크→보라→블루 그라디언트** 배경
- 메시지 카드 **파스텔 컬러 8색 순환** (핑크, 그린, 옐로, 블루 등)
- **호버 이펙트**, **카드 팝인 애니메이션**, **버튼 시머 효과** 등 마이크로 애니메이션
