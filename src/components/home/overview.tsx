import { OverviewCard } from "./overview-card";

export default function Overview() {
  return (
    <div>
      <h2 className="font-semibold text-[16px] mb-4">최근 활동</h2>
      <div className="flex items-center gap-4">
        <OverviewCard />
      </div>
    </div>
  );
}
