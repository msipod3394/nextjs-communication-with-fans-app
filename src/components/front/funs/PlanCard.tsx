import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBenefitsByPlan } from "@/configs/funsBenefits";
import { Plan } from "@/types/Plan";
import { BenefitItem } from "./BenefitItem";
import { SubscriptionButton } from "./SubscriptionButton";

type PlanCardProps = {
  plan: Plan;
  showSubscribeButton: boolean;
  showManageSubscriptionButton: boolean;
  showCreateAccountButton: boolean;
};

export const PlanCard = ({
  plan,
  showSubscribeButton,
  showManageSubscriptionButton,
  showCreateAccountButton,
}: PlanCardProps) => {
  const filteredBenefits = getBenefitsByPlan(plan.name.toLowerCase());

  // 表記を日本語化
  let interval;
  if (plan.interval === "month") {
    interval = "月";
  } else if (plan.interval === "year") {
    interval = "年";
  }

  return (
    <Card key={plan.id} className="flex flex-col justify-between">
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
      <CardFooter>
        <SubscriptionButton
          planId={plan.id}
          showSubscribeButton={showSubscribeButton}
          showManageSubscriptionButton={showManageSubscriptionButton}
          showCreateAccountButton={showCreateAccountButton}
        />
      </CardFooter>
    </Card>
  );
};
