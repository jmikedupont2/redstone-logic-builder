import { GateType } from "@/components/LogicGate";

export function generateCommand(gateType: GateType, inputs?: string): string {
  if (gateType === "DECODER") {
    if (!inputs) return "Please enter a 5-bit binary number";
    
    // Validate input is 5 bits
    const binaryPattern = /^[01]{5}$/;
    if (!binaryPattern.test(inputs)) {
      return "Invalid input. Please enter exactly 5 binary digits (0s and 1s)";
    }

    // Convert binary input to decimal
    const decimal = parseInt(inputs, 2);
    
    // Generate commands to place glowstones based on the binary input
    const commands = [];
    for (let i = 0; i < 4; i++) {
      const shouldPlace = (decimal & (1 << i)) !== 0;
      if (shouldPlace) {
        commands.push(`/setblock ~${i} ~ ~ minecraft:glowstone`);
      } else {
        commands.push(`/setblock ~${i} ~ ~ minecraft:stone`);
      }
    }
    
    return commands.join('\n');
  }

  const commands: Record<GateType, string> = {
    AND: "/fill ~0 ~0 ~0 ~3 ~2 ~2 minecraft:redstone_block 0 replace",
    OR: "/fill ~0 ~0 ~0 ~2 ~2 ~2 minecraft:redstone_torch 0 replace",
    NOT: "/setblock ~0 ~0 ~0 minecraft:redstone_torch 0",
    NAND: "/fill ~0 ~0 ~0 ~3 ~2 ~2 minecraft:redstone_block 0 replace\n/setblock ~3 ~1 ~1 minecraft:redstone_torch 0",
    NOR: "/fill ~0 ~0 ~0 ~2 ~2 ~2 minecraft:redstone_torch 0 replace\n/setblock ~2 ~1 ~1 minecraft:redstone_block 0",
    XOR: "/fill ~0 ~0 ~0 ~4 ~2 ~2 minecraft:redstone_block 0 replace\n/setblock ~2 ~1 ~1 minecraft:redstone_torch 0",
    DECODER: "", // Default empty string, will be handled by the if statement above
  };

  return commands[gateType];
}