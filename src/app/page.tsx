import { HeroSlider } from "@/components/front/index/HeroSlider";
import { microcmsClient } from "@/lib/microcmsClient";
import { WorksContentsList } from "@/types/cms";

export default async function Home() {
  // microCMSからworksを呼び出し
  const worksList: WorksContentsList = await microcmsClient.get({
    endpoint: "e5gfdwcn",
  });

  return (
    <main>
      <HeroSlider contents={worksList.contents} />
    </main>
  );
}
