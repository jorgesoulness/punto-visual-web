import LoadingScreen from "@/components/LoadingScreen";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[90] pointer-events-none">
      <LoadingScreen />
    </div>
  );
}