import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

type Props = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};

function Button({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        `
      relative
      disabled:opacity-70
      disabled:cursor-not-allowed
      rounded-lg
      hover:opacity-80
      transition
      w-full
    `,
        outline
          ? "bg-white border-black text-black"
          : "bg-rose-500 border-rose-500 text-white",
        small
          ? "p-1 text-sm font-light border"
          : "p-3 text-base font-semibold border-2"
      )}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
}

export default Button;
