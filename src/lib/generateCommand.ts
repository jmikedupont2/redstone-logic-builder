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
    
    // Generate commands to build the decoder circuit
    const commands = [];
    
    // Place redstone dust line as the main bus
    commands.push("/fill ~0 ~ ~ ~4 ~ ~ minecraft:redstone_wire");
    
    // Place levers for each input bit
    for (let i = 0; i < 5; i++) {
      const leverState = inputs[i] === "1" ? 8 : 0; // 8 is "powered" state
      commands.push(`/setblock ~${i} ~ ~-1 minecraft:lever[face=floor,facing=south,powered=${leverState === 8}]`);
    }
    
    // Place redstone torches and repeaters for signal conditioning
    commands.push("/setblock ~0 ~ ~1 minecraft:redstone_torch");
    commands.push("/setblock ~1 ~ ~1 minecraft:redstone_repeater[facing=north,delay=1]");
    commands.push("/setblock ~2 ~ ~1 minecraft:redstone_torch");
    commands.push("/setblock ~3 ~ ~1 minecraft:redstone_repeater[facing=north,delay=1]");
    
    // Place glowstones with redstone connections
    for (let i = 0; i < 4; i++) {
      const shouldLight = (decimal & (1 << i)) !== 0;
      if (shouldLight) {
        commands.push(`/setblock ~${i} ~1 ~2 minecraft:glowstone`);
        commands.push(`/setblock ~${i} ~ ~2 minecraft:redstone_wire`);
      } else {
        commands.push(`/setblock ~${i} ~1 ~2 minecraft:stone`);
        commands.push(`/setblock ~${i} ~ ~2 minecraft:redstone_wire`);
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