import { Hero } from "@/components/front/index/Hero";
import { microcmsClient } from "@/lib/microcmsClient";

export default async function Home() {
  // スライダー画像取得
  const data = await microcmsClient.get<{ contents: { slider: SliderImage[] } }>({
    endpoint: "index",
  });

  // const slider = data.contents[0].slider;
  // urlのみ取り出す
  const images: string[] = data.contents[0].slider.map((image) => image.url);

  return (
    <main className="">
      {/* Hero */}
      <Hero images={images} />

      {/* Works */}
      <section id="works"></section>
      {/* News */}
      <section id="news"></section>
      {/* Contact */}
      <section id="contact"></section>
    </main>
  );
}
