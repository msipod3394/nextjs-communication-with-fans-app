import { FrontHeading } from "@/components/dashboard/FrontHeading";
import { BenefitPlans } from "@/components/front/funs/BenefitPlans";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { basicBenefits } from "@/configs/funsBenefits";
import { getAllPlans } from "@/utils/getAllPlans";

export default async function FunsPage() {
  const plans = await getAllPlans();

  return (
    <div>
      <FrontHeading
        heading="Funs"
        description="もっと見たい・応援したいあなたへ"
      />
      <div className="mt-8 flex flex-row gap-8">
        <BenefitPlans plans={plans} />
        {/* {plans.map((plan) => (
          <Card key={plan.id} className="flex flex-col justify-between">
            <div>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  {plan.price}
                  {plan.currency}/{plan.interval}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  {basicBenefits.map((notification, index) => (
                    <div
                      key={index}
                      className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-700" />
                      <div className="space-y-2">
                        <p className="text-sm font-medium leading-none">
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>
            <CardFooter>
              <Button className="w-full">ファンクラブの登録に進む</Button>
            </CardFooter>
          </Card>
        ))} */}

        {/* <Card className="flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle>basic</CardTitle>
              <CardDescription>
                月額500円の会費で、下記の特典を受けることができます。
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                {basicBenefits.map((notification, index) => (
                  <div
                    key={index}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-700" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
          <CardFooter>
            <Button className="w-full">
              <Check className="mr-2 h-4 w-4" /> ファンクラブの登録に進む
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle>premium</CardTitle>
              <CardDescription>
                月額1000円の会費で、下記の特典を受けることができます。
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                {premiumBenefits.map((notification, index) => (
                  <div
                    key={index}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-700" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
          <CardFooter>
            <Button className="w-full">
              <Check className="mr-2 h-4 w-4" /> ファンクラブの登録に進む
            </Button>
          </CardFooter>
        </Card> */}
      </div>
    </div>
  );
}
