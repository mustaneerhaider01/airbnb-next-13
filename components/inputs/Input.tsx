import { InputHTMLAttributes } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

type Props = {
  id: string;
  label: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

function Input({
  id,
  disabled,
  label,
  register,
  errors,
  type = "text",
  formatPrice,
  required,
}: Props) {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        type={type}
        {...register(id, { required })}
        placeholder=" "
        className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"}
          ${
            errors[id]
              ? "border-rose-500 focus:borde-rose-500"
              : "border-neutral-300 focus:border-black"
          }
        `}
      />
      <label
        htmlFor={id}
        className={`
        absolute
        duration-150
        transform
        -translate-y-3
        top-5
        z-10
        origin-[0]
        ${formatPrice ? "left-9" : "left-4"}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? "text-rose-500" : "text-zinc-400"}
      `}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
