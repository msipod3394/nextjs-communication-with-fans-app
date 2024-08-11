import { Plan } from "@/types/plan";
import Stripe from "stripe";

// Stripeから商品情報を取得
export const getAllPlans = async (): Promise<Plan[]> => {
  // stripeの初期化
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  // 商品情報を取得
  const { data } = await stripe.plans.list();

  // 商品名を取得
  const plans: Plan[] = await Promise.all(
    data.map(async (plan) => {
      if (!plan.product) {
        throw new Error(`該当するIDがありません ${plan.id} `);
      }

      const product = await stripe.products.retrieve(plan.product as string);

      // 使うデータだけ返す
      return {
        id: plan.id,
        name: product.name,
        price: plan.amount_decimal,
        currency: plan.currency,
        interval: plan.interval,
      };
    })
  );

  // 順番変更
  const sortPlan = plans.sort(
    (a, b) => parseInt(a.price!) - parseInt(b.price!)
  );

  return sortPlan;
};
