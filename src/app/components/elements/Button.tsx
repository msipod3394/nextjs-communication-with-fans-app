import { Button } from "../../../components/ui/button";

type BaseButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  colorClass?: string;
  onClick?: () => void;
};

export const BaseButton = ({
  children,
  type = "button",
  colorClass,
  onClick,
}: BaseButtonProps) => {
  const baseClasses =
    "text-white font-bold py-2 px-4 rounded focus:outline-none";

  return (
    <Button
      type={type}
      className={`${baseClasses} ${colorClass}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
