import { getBenefitsByPlan } from "@/configs/membershipBenefits";
import { Plan } from "@/types/Plan";
import { BenefitPlanCard } from "./PlanCard";

type BenefitPlansProps = {
  plans: Plan[];
};

export const BenefitPlans = ({ plans }: BenefitPlansProps) => {
  return (
    <>
      {plans.map((plan) => {
        // プラン名によって会員特典を出し分け
        const filteredBenefits = getBenefitsByPlan(plan.name.toLowerCase());
        return (
          <BenefitPlanCard
            key={plan.id}
            plan={plan}
            benefits={filteredBenefits}
          />
        );
      })}
    </>
  );
};
