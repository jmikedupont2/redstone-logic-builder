import { GateType } from "@/components/LogicGate";

export function generateCommand(gateType: GateType): string {
  const commands: Record<GateType, string> = {
    AND: "/fill ~0 ~0 ~0 ~3 ~2 ~2 minecraft:redstone_block 0 replace",
    OR: "/fill ~0 ~0 ~0 ~2 ~2 ~2 minecraft:redstone_torch 0 replace",
    NOT: "/setblock ~0 ~0 ~0 minecraft:redstone_torch 0",
    NAND: "/fill ~0 ~0 ~0 ~3 ~2 ~2 minecraft:redstone_block 0 replace\n/setblock ~3 ~1 ~1 minecraft:redstone_torch 0",
    NOR: "/fill ~0 ~0 ~0 ~2 ~2 ~2 minecraft:redstone_torch 0 replace\n/setblock ~2 ~1 ~1 minecraft:redstone_block 0",
    XOR: "/fill ~0 ~0 ~0 ~4 ~2 ~2 minecraft:redstone_block 0 replace\n/setblock ~2 ~1 ~1 minecraft:redstone_torch 0",
  };

  return commands[gateType];
}