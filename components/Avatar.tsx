import Image from "next/image";

type Props = {
  src?: string | null;
};

function Avatar({ src }: Props) {
  return (
    <Image
      alt="Avatar"
      className="rounded-full"
      height="30"
      width="30"
      src={src || "/images/placeholder.jpg"}
    />
  );
}

export default Avatar;
