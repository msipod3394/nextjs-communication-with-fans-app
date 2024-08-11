import Stripe from "stripe";

export type Plan = {
  id: string;
  name: string | null;
  price: string | null;
  currency: string | null;
  interval: Stripe.Price.Recurring.Interval | null;
};
