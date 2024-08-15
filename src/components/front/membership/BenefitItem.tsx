import { fontRoboto } from "@/configs/font";
import { Benefit } from "@/configs/membershipBenefits";

export const BenefitItem = ({ benefit }: { benefit: Benefit }) => (
  <div className="mb-4 grid grid-cols-[24px_1fr] items-start last:mb-0 last:pb-0">
    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-700" />
    <div className="space-y-2">
      <p className={`${fontRoboto.className} text-sm font-medium leading-none`}>
        {benefit.title}
      </p>
      <p className="text-sm text-muted-foreground">{benefit.description}</p>
    </div>
  </div>
);
