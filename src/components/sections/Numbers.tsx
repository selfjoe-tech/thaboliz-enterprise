import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "250+", label: "Projects completed successfully" },
  { value: "15", label: "Years of operational experience" },
  { value: "8", label: "Core industries served" },
  { value: "5000+", label: "Lives touched through empowerment" },
];

export default function Numbers() {
  return (
    <section className="py-16">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <Reveal>
          <div>
            <h2 className="mt-2 text-4xl font-semibold leading-tight text-white">
              Numbers that speak for
              <br />
              themselves
            </h2>
            <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-md">
              Consistent delivery across industries. These figures reflect disciplined execution
              and long-term partnerships.
            </p>

            
          </div>
        </Reveal>

        <div className="border border-white/10 bg-black shadow-soft-dark">
          <div className="grid grid-cols-2">
            {stats.map((s, idx) => {
              const isRight = idx % 2 === 1;
              const isBottom = idx >= 2;
              return (
                <div
                  key={s.label}
                  className={[
                    "p-6",
                    isRight ? "border-l border-white/10" : "",
                    isBottom ? "border-t border-white/10" : "",
                  ].join(" ")}
                >
                  <div className="text-5xl font-semibold text-white">{s.value}</div>
                  <div className="mt-2 text-sm text-white/70">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
