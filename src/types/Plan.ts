import Stripe from "stripe";

export type Plan = {
  id: string;
  name: string;
  price: string;
  currency: string;
  interval: Stripe.Price.Recurring.Interval | null;
};
