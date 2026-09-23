import { TooltipProvider } from "@/components/ui/tooltip";
import Explorer from "@/pages/Explorer";

export default function App() {
  return (
    <TooltipProvider delayDuration={350}>
      <Explorer />
    </TooltipProvider>
  );
}
