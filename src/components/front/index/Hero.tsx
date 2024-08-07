import styles from "@/styles/(front)/page.module.css";
import ImageSlider from "./ImageSlider";

type HeroProps = {
  images: string[];
};

export const Hero = ({ images }: HeroProps) => {
  return (
    <section
      id="hero"
      className={`relative overflow-hidden sm:grid sm:grid-cols-2 gap-4 sm:mt-20 ${styles.heroHeight}`}
    >
      <div
        className={`absolute w-full z-40 sm:relative flex items-center justify-center overflow-hidden ${styles.heroHeight}`}
      >
        <h1 className="font-heading text-center text-white text-4xl tracking-tighter font-bold sm:text-gray-800 sm:text-5xl md:text-6xl lg:text-7xl">
          Cosplayer Portfolio
        </h1>
      </div>
      <ImageSlider images={images} />
    </section>
  );
};
