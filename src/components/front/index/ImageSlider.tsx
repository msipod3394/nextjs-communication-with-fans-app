"use client";
import Image from "next/image";
import Slider from "react-slick";

type ImageSliderProps = {
  images: string[];
};

const ImageSlider = ({ images }: ImageSliderProps) => {
  // スライダー設定
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
  };

  return (
    <Slider {...settings} className="">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-w-3 aspect-h-4 overflow-hidden"
        >
          <Image
            src={image}
            fill
            objectFit="cover"
            objectPosition="top"
            className="object-cover"
            alt={`Slide ${index}`}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
