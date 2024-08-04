// 会員特典管理
export type Benefit = {
  title: string;
  description: string;
  plan: string;
};

export const benefits: Benefit[] = [
  {
    title: "会員限定プレミアム動画視聴",
    description: "限定で配信しているプレミアム動画を視聴することができます",
    plan: "basic",
  },
  {
    title: "コミュニケーション機能",
    description: "撮影会で撮影した写真を投稿・保存することができます",
    plan: "premium",
  },
  {
    title: "写真集を優先販売",
    description: "コミケで販売予定の写真集を優先で販売します",
    plan: "premium",
  },
];

// 特典のフィルタリング
export const getBenefitsByPlan = (plan: string) => {
  if (plan === "basic") {
    // basicだけ
    return benefits.filter((benefit) => benefit.plan === "basic");
  } else if (plan === "premium") {
    // basic,premium どちらも
    return benefits.filter(
      (benefit) => benefit.plan === "basic" || benefit.plan === "premium"
    );
  }
  return [];
};
