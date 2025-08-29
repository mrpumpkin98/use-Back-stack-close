import * as React from "react";
import { useHistoryBackDrawer } from "../../src/useHistoryBackDrawer";

// 기본 스타일
const styles = {
   app: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
   },
   button: {
      padding: "10px 15px",
      margin: "5px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
   },
   drawer: {
      position: "fixed" as const,
      top: "0",
      right: "0",
      height: "100%",
      width: "300px",
      backgroundColor: "white",
      boxShadow: "-2px 0 5px rgba(0,0,0,0.2)",
      padding: "20px",
      zIndex: 1000,
      transition: "transform 0.3s ease",
   },
   modal: {
      position: "fixed" as const,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "5px",
      boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      zIndex: 1001,
   },
   backdrop: {
      position: "fixed" as const,
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)",
      zIndex: 999,
   },
};

// React.FC 대신 일반 함수 선언 사용
export default function App() {
   // 여러 오버레이 상태 관리
   const [isDrawer1Open, setIsDrawer1Open] = React.useState(false);
   const [isDrawer2Open, setIsDrawer2Open] = React.useState(false);
   const [isModalOpen, setIsModalOpen] = React.useState(false);

   // 디버깅을 위한 로그 효과
   React.useEffect(() => {
      console.log("상태 변경 - 오버레이 상태:", {
         드로어1: isDrawer1Open,
         드로어2: isDrawer2Open,
         모달: isModalOpen,
      });
   }, [isDrawer1Open, isDrawer2Open, isModalOpen]);

   // 히스토리 상태 로깅
   React.useEffect(() => {
      const logHistoryState = () => {
         console.log("현재 히스토리 상태:", window.history.state);
      };

      // 초기 히스토리 상태 기록
      logHistoryState();

      // popstate 이벤트 핸들러
      const handlePopState = (event: PopStateEvent) => {
         console.log("뒤로가기 이벤트 감지:", event.state);
         logHistoryState();
      };

      // pushState 함수 오버라이드
      const originalPushState = window.history.pushState;
      window.history.pushState = function () {
         // @ts-ignore
         const result = originalPushState.apply(this, arguments);
         console.log("히스토리 추가됨:", arguments[0]);
         return result;
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
         window.removeEventListener("popstate", handlePopState);
         window.history.pushState = originalPushState;
      };
   }, []);

   // 백 스택 관리 훅 사용
   useHistoryBackDrawer([
      { isOpen: isDrawer1Open, setIsOpen: setIsDrawer1Open },
      { isOpen: isDrawer2Open, setIsOpen: setIsDrawer2Open },
      { isOpen: isModalOpen, setIsOpen: setIsModalOpen },
   ]);

   return (
      <div style={styles.app}>
         <h1>use-back-stack-overlay 예제</h1>
         <p>
            아래 버튼을 눌러 드로어나 모달을 열고, 브라우저의 뒤로가기 버튼을 눌러보세요. 가장 마지막에 열린 오버레이가
            먼저 닫힙니다.
         </p>

         <div>
            <button
               style={styles.button}
               onClick={() => setIsDrawer1Open(true)}
            >
               드로어 1 열기
            </button>
            <button
               style={styles.button}
               onClick={() => setIsDrawer2Open(true)}
            >
               드로어 2 열기
            </button>
            <button
               style={styles.button}
               onClick={() => setIsModalOpen(true)}
            >
               모달 열기
            </button>
         </div>

         {/* 드로어 1 */}
         {isDrawer1Open && (
            <>
               <div
                  style={styles.backdrop}
                  onClick={() => setIsDrawer1Open(false)}
               />
               <div style={styles.drawer}>
                  <h2>드로어 1</h2>
                  <p>이 드로어는 뒤로가기로 닫을 수 있습니다.</p>
                  <button
                     style={styles.button}
                     onClick={() => setIsDrawer1Open(false)}
                  >
                     닫기
                  </button>
               </div>
            </>
         )}

         {/* 드로어 2 */}
         {isDrawer2Open && (
            <>
               <div
                  style={styles.backdrop}
                  onClick={() => setIsDrawer2Open(false)}
               />
               <div style={styles.drawer}>
                  <h2>드로어 2</h2>
                  <p>이 드로어도 뒤로가기로 닫을 수 있습니다.</p>
                  <button
                     style={styles.button}
                     onClick={() => setIsDrawer2Open(false)}
                  >
                     닫기
                  </button>
               </div>
            </>
         )}

         {/* 모달 */}
         {isModalOpen && (
            <>
               <div
                  style={styles.backdrop}
                  onClick={() => setIsModalOpen(false)}
               />
               <div style={styles.modal}>
                  <h2>모달</h2>
                  <p>이 모달도 뒤로가기로 닫을 수 있습니다.</p>
                  <button
                     style={styles.button}
                     onClick={() => setIsModalOpen(false)}
                  >
                     닫기
                  </button>
               </div>
            </>
         )}
      </div>
   );
}
