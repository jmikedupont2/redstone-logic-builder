import { Button } from "@/components/ui/button";

export type GateType = "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR" | "DECODER";

interface LogicGateProps {
  type: GateType;
  selected: boolean;
  onClick: () => void;
}

export function LogicGate({ type, selected, onClick }: LogicGateProps) {
  return (
    <Button
      variant={selected ? "default" : "outline"}
      onClick={onClick}
      className={`w-full font-minecraft ${
        selected ? "bg-redstone hover:bg-redstone/90" : ""
      }`}
    >
      {type}
    </Button>
  );
}