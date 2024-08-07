import Link from "next/link";
import styles from "./button.module.scss";

type SquareLinkProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

export const SquareLink = ({
  children,
  href,
  className,
  onClick,
}: SquareLinkProps) => {
  return (
    <Link href={href} className={` ${className} ${styles.SquareLink}`}>
      {children}
    </Link>
  );
};
