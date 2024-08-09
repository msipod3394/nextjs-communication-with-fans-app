"use client";
import { useWindowSize } from "@/hooks/useWindowSize";
import { WorksContentsList } from "@/types/cms";
import { useCallback, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { HeroSliderItem } from "./HeroSliderItem";
import styles from "./index.module.scss";
import { settingsDesktop, settingsMobile } from "./sliderSetting";

type HeroSliderProps = {
  contents: WorksContentsList[];
};

export const HeroSlider = ({ contents }: HeroSliderProps) => {
  // ウィンドウサイズ判定
  const { isDesktop } = useWindowSize();

  // クライアントサイドでのみレンダリングを行う
  // メモ：コンポーネントがサーバーサイドでのレンダリング中に実行しないようにする
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ホイール操作でスライド移動できるように
  const sliderRef = useRef(null);
  const handleWheel = useCallback((event) => {
    if (sliderRef.current) {
      if (event.deltaY > 0) {
        sliderRef.current.slickNext();
      } else {
        sliderRef.current.slickPrev();
      }
    }
  }, []);

  // クライアントサイドでのみ表示
  if (!isClient) {
    return null;
  }

  // 最新6件まで
  const limit = 6;

  return (
    <div
      className={`w-full overflow-hidden sm: ${styles.mainHeight}`}
      onWheel={handleWheel}
    >
      <Slider
        ref={sliderRef}
        {...(isDesktop ? settingsDesktop : settingsMobile)}
      >
        {contents
          .slice(0, limit)
          .map((content) =>
            content.is_show_top ? (
              <HeroSliderItem key={content.id} content={content} />
            ) : null
          )}
      </Slider>
    </div>
  );
};
