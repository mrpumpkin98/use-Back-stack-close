# useBackStackOverlay

PWA 스타일의 React Hook으로, 모달이나 드로어 등 오버레이 UI를 브라우저 뒤로가기 스택처럼 제어할 수 있습니다.

## 설치

```bash
npm install use-back-stack-overlay
```

## 기능

- 브라우저의 뒤로가기 버튼으로 모달, 드로어 등의 UI를 닫을 수 있습니다
- 여러 개의 오버레이가 열려 있을 때 가장 최근에 열린 것부터 순서대로 닫힙니다
- PWA와 같은 모바일 앱 경험을 웹에서 제공합니다
- Next.js 및 React와 호환됩니다

## 사용 방법

```jsx
import { useState } from "react";
import { useDrawerCloseNotAllBack } from "use-back-stack-overlay";

function App() {
  // 드로어 상태 관리
  const [isDrawer1Open, setIsDrawer1Open] = useState(false);
  const [isDrawer2Open, setIsDrawer2Open] = useState(false);

  // 훅 사용
  const handleClose = useDrawerCloseNotAllBack([
    { isOpen: isDrawer1Open, setIsOpen: setIsDrawer1Open },
    { isOpen: isDrawer2Open, setIsOpen: setIsDrawer2Open },
  ]);

  return (
    <div>
      <button onClick={() => setIsDrawer1Open(true)}>드로어 1 열기</button>
      <button onClick={() => setIsDrawer2Open(true)}>드로어 2 열기</button>

      {isDrawer1Open && (
        <div className="drawer">
          <h2>드로어 1</h2>
          <button onClick={() => setIsDrawer1Open(false)}>닫기</button>
        </div>
      )}

      {isDrawer2Open && (
        <div className="drawer">
          <h2>드로어 2</h2>
          <button onClick={() => setIsDrawer2Open(false)}>닫기</button>
        </div>
      )}
    </div>
  );
}
```

## 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/yourusername/use-back-stack-overlay.git
cd use-back-stack-overlay

# 의존성 설치
npm install

# 빌드
npm run build
```

## 라이선스

MIT

## 기여하기

이슈와 풀 리퀘스트는
환영합니다. 대규모 변경사항은 먼저 이슈를 등록해 주세요.
