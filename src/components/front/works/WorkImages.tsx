"use client";
import { breakpoint, useWindowSize } from "@/hooks/useWindowSize";
import { Image as CMSImage } from "@/types/cms";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { WorkModal } from "./WorkModal";

type WorkImagesProps = {
  items: CMSImage[];
};

export const WorkImages = ({ items }: WorkImagesProps) => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const { width } = useWindowSize();

  const handleImageClick = useCallback(
    (url: string) => {
      if (isDesktop) {
        setSelectedImage(url);
      }
    },
    [isDesktop]
  );

  useEffect(() => {
    setIsDesktop(width >= breakpoint);
  }, [width]);

  return (
    <>
      <div className="mt-8 grid gap-10 my-12 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item, index) => (
          <div key={index}>
            <Image
              key={index}
              src={item.url}
              width={item.width}
              height={item.height}
              alt={`Photo ${index + 1}`}
              onClick={() => handleImageClick(item.url)}
              className={isDesktop ? "cursor-pointer" : ""}
            />
          </div>
        ))}
      </div>
      {isDesktop && selectedImage && (
        <WorkModal
          url={selectedImage}
          setSelectedImage={() => setSelectedImage("")}
        />
      )}
    </>
  );
};
