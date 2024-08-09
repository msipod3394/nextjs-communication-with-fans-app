import Link from "next/link";

export const SnsList = ({ snsList }) => {
  return (
    <div className="flex gap-4">
      {snsList.map(({ name, href, Icon }) => (
        <Link
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center transition-opacity hover:opacity-70"
        >
          <Icon className="w-6 h-6" />
        </Link>
      ))}
    </div>
  );
};
