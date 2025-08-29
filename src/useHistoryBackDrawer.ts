import { useEffect, useRef, useCallback } from "react";

interface DrawerState {
   isOpen: boolean;
   setIsOpen: (isOpen: boolean) => void;
}

export function useHistoryBackDrawer(drawers: DrawerState[]) {
   const prevDrawerStates = useRef<boolean[]>([]);
   const isInitialized = useRef(false);

   // 브라우저 환경 체크
   const isBrowser = typeof window !== "undefined";

   // drawers 배열의 길이가 변경될 때만 이전 상태 배열 재생성
   const drawerCount = drawers.length;
   useEffect(() => {
      if (prevDrawerStates.current.length !== drawerCount) {
         prevDrawerStates.current = new Array(drawerCount).fill(false);
      }
   }, [drawerCount]);

   // Drawer가 닫힐 때 히스토리 처리
   const handleClose = useCallback(() => {
      if (!isBrowser) return;

      if (window.history.state?.type === "drawer") {
         window.history.back();
      }
   }, [isBrowser]);

   // popstate 이벤트 핸들러를 메모화
   const handlePopState = useCallback(() => {
      // 가장 마지막에 열린 Drawer 찾기 (역순으로 검색하여 최근 열린 것부터)
      for (let i = drawers.length - 1; i >= 0; i--) {
         if (drawers[i].isOpen) {
            drawers[i].setIsOpen(false);
            break; // 하나만 닫고 종료
         }
      }
   }, [drawers]);

   useEffect(() => {
      if (!isBrowser) return;

      const isAnyDrawerOpen = drawers.some((drawer) => drawer.isOpen);

      // 새로 열린 Drawer 확인 및 히스토리 추가
      drawers.forEach((drawer, index) => {
         const wasOpen = prevDrawerStates.current[index];
         const isOpen = drawer.isOpen;

         // 새로 열린 경우에만 히스토리 추가
         if (isOpen && !wasOpen) {
            const currentPath = window.location.pathname;
            const currentSearch = window.location.search;

            // 히스토리에 현재 경로와 쿼리 파라미터 추가
            window.history.pushState({ type: "drawer" }, "", currentPath + currentSearch);
         }

         // 현재 상태 저장
         prevDrawerStates.current[index] = isOpen;
      });

      // 초기화 완료 표시
      if (!isInitialized.current) {
         isInitialized.current = true;
      }

      // popstate 이벤트 리스너 등록
      window.addEventListener("popstate", handlePopState);

      return () => {
         window.removeEventListener("popstate", handlePopState);
      };
   }, [drawers, handlePopState, isBrowser]);

   // onClose 핸들러 반환
   return handleClose;
}
