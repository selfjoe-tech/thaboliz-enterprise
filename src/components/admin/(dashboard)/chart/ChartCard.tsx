// components/ChartCard.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, ChevronLeft } from "lucide-react";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  Label,
} from "recharts";
import { BarChartSkeleton } from "@/app/components/skeletons/BarChartSkeleton";

type Metric = "revenue" | "orders" | "users";
type Bucket = { label: string; start: string; end: string; value: number };

export function ChartCard({ metric, title, yLabel }: { metric: Metric; title: string; yLabel: string }) {
  const [granularity, setGranularity] = useState<"year" | "month" | "day">("year");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);

  // REF + measured height (px) for the chart area
  const chartWrapperRef = useRef<HTMLDivElement | null>(null);
  const [chartHeightPx, setChartHeightPx] = useState<number>(Math.round((typeof window !== "undefined" ? window.innerHeight : 800) * 0.8)); // default 80vh

  // Measure wrapper height so Recharts gets a real pixel height
  useEffect(() => {
    const el = chartWrapperRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      // ensure minimum 80vh in pixels
      const min80vh = Math.round(window.innerHeight * 0.8);
      const h = Math.max(min80vh, Math.round(rect.height));
      setChartHeightPx(h);
    };

    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);

    // fallback
    const onResize = () => update();
    window.addEventListener("resize", onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    setAnimKey((k) => k + 1);
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.set("metric", metric);
    params.set("granularity", granularity);
    if (granularity === "month" && selectedYear) params.set("year", String(selectedYear));
    if (granularity === "day" && selectedYear && selectedMonth) {
      params.set("year", String(selectedYear));
      params.set("month", String(selectedMonth));
    }

    fetch(`/api/charts?${params.toString()}`)
      .then((r) => r.json())
      .then((json) => {
        if (json?.error) {
          setError("Something went wrong, please refresh");
          setBuckets([]);
        } else {
          setBuckets(json.buckets || []);
        }
      })
      .catch((e) => {
        console.error("chart fetch error", e);
        setError("Failed to load data");
        setBuckets([]);
      })
      .finally(() => setLoading(false));
  }, [metric, granularity, selectedYear, selectedMonth]);

  function onBarClick(bucket: Bucket) {
    if (granularity === "year") {
      const yearNum = Number(bucket.label);
      setSelectedYear(yearNum);
      setGranularity("month");
      setSelectedMonth(null);
    } else if (granularity === "month") {
      const dt = new Date(bucket.start);
      setSelectedMonth(dt.getUTCMonth() + 1);
      setGranularity("day");
    }
  }

  function onBack() {
    if (granularity === "day") {
      setGranularity("month");
      setSelectedMonth(null);
    } else if (granularity === "month") {
      setGranularity("year");
      setSelectedYear(null);
    }
  }

  function exportCSV() {
    const header = ["label", "start", "end", "value"];
    const rows = buckets.map((b) => [b.label, b.start, b.end, String(b.value)]);
    const csv = [header.join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${metric}_${granularity}_${selectedYear ?? "all"}${selectedMonth ? `_${selectedMonth}` : ""}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const color = metric === "revenue" ? "#10B981" : metric === "orders" ? "#3B82F6" : "#F59E0B";
  const containerVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

  // Determine dynamic axis labels
  const xAxisLabel = granularity === "year" ? "Year" : granularity === "month" ? "Month" : "Day";
  const yAxisLabel =
    metric === "revenue" ? "Total revenue in rands (R)" : metric === "orders" ? "Total number of orders" : "Total number of Users";

  return (
    // card: hide overflow so nothing spills out; card's height determined by its content (chart wrapper has min 80vh)
    <div className="bg-white rounded-xl p-4 shadow overflow-hidden">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm text-gray-600">{title}</h3>
          <p className="text-lg font-semibold">
            {granularity === "year" ? "Year overview" : granularity === "month" ? `Year ${selectedYear}` : `Month ${selectedMonth}/${selectedYear}`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {granularity !== "year" && (
            <button className="flex items-center gap-2 px-3 py-1 rounded border hover:bg-gray-50" onClick={onBack}>
              <ChevronLeft size={16} /> Back
            </button>
          )}

          {granularity !== "year" && (
            <select className="border rounded px-2 py-1" value={selectedYear ?? ""} onChange={(e) => setSelectedYear(Number(e.target.value))}>
              <option value="">Year</option>
              {Array.from({ length: 6 }).map((_, i) => {
                const y = new Date().getUTCFullYear() - (5 - i);
                return (
                  <option key={y} value={y}>
                    {y}
                  </option>
                );
              })}
            </select>
          )}

          {granularity === "day" && (
            <select className="border rounded px-2 py-1" value={selectedMonth ?? ""} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
              <option value="">Month</option>
              {Array.from({ length: 12 }).map((_, i) => {
                const m = i + 1;
                return (
                  <option key={m} value={m}>
                    {new Date(Date.UTC(2020, i, 1)).toLocaleString("en-US", { month: "short" })}
                  </option>
                );
              })}
            </select>
          )}

          <button className="flex items-center gap-2 px-3 py-1 rounded border hover:bg-gray-50" onClick={exportCSV} title="Export CSV">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Chart wrapper: min 80vh; measure it and hand pixels to Recharts. Scroll internally if needed */}
      <div ref={chartWrapperRef} className="w-full min-h-[80vh] max-h-[90vh] overflow-auto">
        {loading ? (
          <BarChartSkeleton bars={6} /> 
        ) : error ? (
          <div className="text-red-500 p-4">{error}</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={`${metric}-${granularity}-${selectedYear ?? "all"}-${selectedMonth ?? ""}-${animKey}`} initial="hidden" animate="visible" exit="hidden" variants={containerVariants} className="h-full">
              <ChartContainer id={`${metric}-${granularity}`} className="h-full w-full aspect-auto" config={{ value: { label: yLabel, color } }}>
                <RechartsInner
                  buckets={buckets}
                  color={color}
                  metric={metric}
                  onBarClick={onBarClick}
                  heightPx={chartHeightPx}
                  xAxisLabel={xAxisLabel}
                  yAxisLabel={yAxisLabel}
                />
              </ChartContainer>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

/* Recharts rendering inside ChartContainer */
function RechartsInner({
  buckets,
  color,
  metric,
  onBarClick,
  heightPx,
  xAxisLabel,
  yAxisLabel,
}: {
  buckets: any[];
  color: string;
  metric: Metric;
  onBarClick: (b: Bucket) => void;
  heightPx: number;
  xAxisLabel: string;
  yAxisLabel: string;
}) {
  const rotateAngle = buckets.length > 12 ? -60 : buckets.length > 8 ? -45 : 0;
  const textAnchor = rotateAngle ? "end" : "middle";

  return (
    // give Recharts an explicit pixel height (measured from wrapper)
    <ResponsiveContainer width="100%" height={Math.max(240, heightPx)}>
      <ReBarChart data={buckets} margin={{ top: 20, right: 24, left: 48, bottom: rotateAngle ? 100 : 36 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" interval={0} tick={{ fontSize: 12, angle: rotateAngle, textAnchor }}>
          <Label value={xAxisLabel} position="bottom" offset={8} style={{ fontSize: 13, fill: "#6b7280" }} />
        </XAxis>

        <YAxis tickCount={6} width={64}>
          <Label
            value={yAxisLabel}
            angle={-90}
            position="left"
            offset={-12}
            style={{ textAnchor: "middle", fontSize: 13, fill: "#6b7280" }}
          />
        </YAxis>

        <Tooltip
          content={(props: any) => (
            <ChartTooltipContent
              {...props}
              formatter={(val: any) => (metric === "revenue" ? `R ${Number(val).toLocaleString()}` : `${Number(val).toLocaleString()}`)}
              label={metric === "revenue" ? "Revenue (click for details)" : metric === "orders" ? "Orders (click for details)" : "Users (click for details)"}
            />
          )}
        />
        <Bar dataKey="value" fill="var(--color-value)" onClick={(d) => onBarClick(d.payload)} cursor="pointer" isAnimationActive animationBegin={80} animationDuration={900} animationEasing="ease">
          {buckets.map((entry, index) => (
            <Cell key={`cell-${index}`} fill="var(--color-value)" />
          ))}
        </Bar>
      </ReBarChart>
    </ResponsiveContainer>
  );
}
