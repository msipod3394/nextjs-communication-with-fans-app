import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBenefitsByPlan } from "@/configs/membershipBenefits";
import { Plan } from "@/types/plan";
import { ReactNode } from "react";
import { BenefitItem } from "./BenefitItem";

type BenefitPlanCardProps = {
  plan: Plan;
  children: ReactNode;
  className?: string;
};

export const BenefitPlanCard = ({
  plan,
  children,
  className = "",
}: BenefitPlanCardProps) => {
  const filteredBenefits = getBenefitsByPlan(plan.name!.toLowerCase());

  // 表記を日本語化
  let interval;
  if (plan.interval === "month") {
    interval = "月";
  } else if (plan.interval === "year") {
    interval = "年";
  }

  return (
    <Card
      key={plan.id}
      className={`flex flex-col justify-between ${className}`}
    >
      <div>
        <CardHeader className="grid gap-1">
          <CardTitle>{plan.name}</CardTitle>
          <CardDescription className="text-md text-bold">
            {interval}額 {plan.price} 円
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {filteredBenefits.map((benefit, index) => (
            <BenefitItem key={index} benefit={benefit} />
          ))}
        </CardContent>
      </div>
      <CardFooter>{children}</CardFooter>
    </Card>
  );
};
