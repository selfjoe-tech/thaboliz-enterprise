import Image from "next/image";
import * as React from "react";

type Props = Omit<React.ComponentProps<typeof Image>, "src" | "alt"> & {
  alt?: string;
  /** Use the tight-cropped logo by default */
  variant?: "tight" | "full";
};

export default function ThabolizLogo({
  alt = "Thaboliz Enterprise",
  variant = "tight",
  width = 220,
  height = 58,
  ...props
}: Props) {
  const src = variant === "tight"
    ? "/brand/thaboliz-lockup-stacked.png"
    : "/brand/thaboliz-lockup-stacked.png";

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}
