import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Benefit } from "@/configs/funsBenefits";
import { Plan } from "@/types/Plan";

type BenefitPlanCardProps = {
  plan: Plan;
  benefits: Benefit[];
};

export const BenefitPlanCard = ({ plan, benefits }: BenefitPlanCardProps) => {
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
          <div>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-700" />
                <div className="space-y-2">
                  <p className="text-sm font-medium leading-none">
                    {benefit.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
      <CardFooter>
        <Button className="w-full">ファンクラブ登録</Button>
      </CardFooter>
    </Card>
  );
};
