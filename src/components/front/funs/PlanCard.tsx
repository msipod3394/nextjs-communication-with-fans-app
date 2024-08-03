import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBenefitsByPlan } from "@/configs/funsBenefits";
import { BenefitItem } from "./BenefitItem";

export const PlanCard = ({
  plan,
  showSubscribeButton,
  showManageSubscriptionButton,
  showCreateAccountButton,
}) => {
  const filteredBenefits = getBenefitsByPlan(plan.name.toLowerCase());

  return (
    <Card key={plan.id} className="flex flex-col justify-between">
      <div>
        <CardHeader>
          <CardTitle>{plan.name}</CardTitle>
          <CardDescription>
            {plan.amount} {plan.currency}/{plan.interval}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {filteredBenefits.map((benefit, index) => (
            <BenefitItem key={index} benefit={benefit} />
          ))}
        </CardContent>
      </div>
      <CardFooter>
        <div className="mt-4">
          {showSubscribeButton && (
            <Button className="w-full">サブスクリプション登録</Button>
          )}
          {showManageSubscriptionButton && (
            <Button className="w-full">サブスクリプション管理</Button>
          )}
          {showCreateAccountButton && (
            <Button className="w-full">ログイン</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
