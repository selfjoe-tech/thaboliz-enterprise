// components/chart/Chart.tsx
import { ChartCard } from "./ChartCard";

export function Chart() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Stack vertically: each card full width, no fixed height wrappers */}
      <div className="flex flex-col gap-6">
        {/* Cards will size by content; we provide min-heights so axes have room */}
        <div className="w-full">
          <ChartCard metric="revenue" title="Revenue Bar Graph" yLabel="Total revenue (R)" />
        </div>

        <div className="w-full">
          <ChartCard metric="orders" title="Orders Bar Graph" yLabel="Total orders" />
        </div>

        <div className="w-full">
          <ChartCard metric="users" title="Users Bar Graph" yLabel="Total users" />
        </div>
      </div>
    </div>
  );
}
