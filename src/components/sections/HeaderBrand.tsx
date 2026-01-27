import ThabolizLogo from "@/components/brand/ThabolizLogo";

export default function HeaderBrand({w, h} 
    : {
        w: number;
        h: number;
    }
) {
  return (
    <div className="flex items-center gap-3">
      <ThabolizLogo variant="tight" width={w} height={h} />
    </div>
  );
}
