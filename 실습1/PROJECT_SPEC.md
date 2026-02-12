# Todo List 웹앱 프로젝트 명세서

이 문서는 Next.js 16을 기반으로 구축된 현대적인 Todo List 웹 애플리케이션의 개발 명세 및 기술 스택을 정의합니다.

## 1. 프로젝트 개요
사용자가 일상적인 할 일을 쉽고 아름답게 관리할 수 있는 웹 애플리케이션입니다. 글래스모피즘(Glassmorphism) 디자인과 부드러운 애니메이션을 통해 프리미엄 사용자 경험을 제공합니다.

## 2. 주요 기능
- **할 일 목록 조회**: 등록된 모든 할 일을 목록 형태로 확인합니다.
- **할 일 추가**: 새로운 할 일을 입력하고 추가할 수 있습니다.
- **할 일 완료 체크**: 할 일의 완료 상태를 토글(Toggle)할 수 있으며, 완료 시 시각적인 피드백(취소선 등)을 제공합니다.
- **할 일 삭제**: 리스트에서 특정 할 일을 제거할 수 있습니다.
- **데이터 유지**: 브라우저의 `localStorage`를 사용하여 페이지 새로고침 후에도 데이터가 유지됩니다.
- **진축도 표시**: 전체 할 일 중 완료된 항목의 개수를 하단에 표시합니다.

## 3. 기술 스택
### Frontend
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React

## 4. 디자인 시스템
- **Concept**: Glassmorphism (복합적인 배경 그라데이션, 블러 효과, 투명도 활용)
- **Typography**: Geist Sans (Next.js 기본 폰트) 및 시스템 폰트
- **Color Palette**:
  - Main: Indigo (#4f46e5)
  - Success: Emerald (#10b981)
  - Danger: Rose (#f43f5e)
  - Background: Slate 계열의 동적 그라데이션 (Light/Dark 모드 대응)

## 5. 프로젝트 구조
```text
src/
├── app/
│   ├── globals.css      # 전역 스타일 및 글래스모피즘 유틸리티
│   ├── layout.tsx       # 전체 레이아웃 구성
│   └── page.tsx         # 메인 비즈니스 로직 및 전체 컨테이너
├── components/
│   ├── AddTodo.tsx      # 할 일 입력 컴포넌트
│   └── TodoItem.tsx     # 개별 할 일 항목 컴포넌트
└── types/
    └── todo.ts          # Todo 인터페이스 정의
```

## 6. 개발 및 실행 방법
1. **의존성 설치**: `npm install`
2. **개발 서버 실행**: `npm run dev`
3. **빌드**: `npm run build`
