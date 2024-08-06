import debounce from "lodash.debounce";
import { useEffect, useState } from "react";

export const breakpoint = 768; // 固定のブレイクポイント

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // デバウンスされたリサイズハンドラ
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 200); // 200ms の遅延

    // 初回レンダリング時にサイズを設定
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    ...windowSize,
    isDesktop: windowSize.width >= breakpoint,
  };
};
