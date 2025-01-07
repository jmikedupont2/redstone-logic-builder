import { cn } from "@/lib/utils";

export type GateType = "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR";

interface LogicGateProps {
  type: GateType;
  selected?: boolean;
  onClick?: () => void;
}

export function LogicGate({ type, selected, onClick }: LogicGateProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-4 rounded-lg border-2 transition-all duration-200",
        "hover:border-redstone hover:bg-gray-800",
        "flex items-center justify-center font-minecraft",
        selected
          ? "border-redstone bg-gray-800 text-redstone"
          : "border-gray-700 bg-gray-900 text-gray-300"
      )}
    >
      {type}
    </button>
  );
}