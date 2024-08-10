// 会員特典管理
export type Benefit = {
  title: string;
  description: string;
  plan: string;
};

export const benefits: Benefit[] = [
  {
    title: "会員限定プレミアムフォトの閲覧",
    description: "会員様限定で公開しているプレミアムフォトを閲覧することができます",
    plan: "basic",
  },
  {
    title: "コミュニケーション機能",
    description: "撮影会で撮影した写真を投稿・保存することができます",
    plan: "basic",
  },
  {
    title: "写真集を優先販売",
    description: "写真集を優先に購入予約できます",
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
