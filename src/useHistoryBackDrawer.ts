import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";

interface DrawerState {
  isOpen: any;
  setIsOpen: (isOpen: any) => void;
}

export function useHistoryBackDrawer(drawers: DrawerState[]) {
  const router = useRouter();
  const prevOpenState = useRef(false);
  const prevDrawerStates = useRef(new Array(drawers.length).fill(false)); // 각 Drawer의 이전 상태 저장

  // Drawer가 닫힐 때 히스토리 처리
  const handleClose = useCallback(() => {
    if (window.history.state?.type === "drawer") {
      window.history.back();
    }
  }, []);

  useEffect(() => {
    const isAnyDrawerOpen = drawers.some((drawer) => drawer.isOpen);

    // 새로 열린 Drawer 확인 및 히스토리 추가
    drawers.forEach((drawer, index) => {
      if (drawer.isOpen && !prevDrawerStates.current[index]) {
        // 현재 URL의 쿼리 파라미터 유지
        const currentQuery = router.query;
        const currentPath = router.asPath.split("?")[0];
        const queryString = new URLSearchParams(
          router.asPath.split("?")[1] || ""
        ).toString();

        // 히스토리에 현재 경로와 쿼리 파라미터 추가
        window.history.pushState(
          { type: "drawer" },
          "",
          queryString ? `${currentPath}?${queryString}` : currentPath
        );
      }
      prevDrawerStates.current[index] = drawer.isOpen; // 현재 상태 저장
    });

    // Drawer가 닫힌 경우 (외부 터치로 인한 닫힘)
    if (!isAnyDrawerOpen) {
      handleClose();
    }

    // 이전 상태 업데이트
    prevOpenState.current = isAnyDrawerOpen;

    const handlePopState = () => {
      // 가장 마지막에 열린 Drawer 찾기
      const openDrawer = drawers.find((drawer) => drawer.isOpen);

      // 열린 Drawer가 있으면 해당 Drawer만 닫기
      if (openDrawer) {
        openDrawer.setIsOpen(false);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [drawers, handleClose, router]);

  // onClose 핸들러 반환
  return handleClose;
}
