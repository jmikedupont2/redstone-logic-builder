import { useState } from "react";
import { LogicGate, GateType } from "@/components/LogicGate";
import { CommandOutput } from "@/components/CommandOutput";
import { generateCommand } from "@/lib/generateCommand";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const GATES: GateType[] = ["AND", "OR", "NOT", "NAND", "NOR", "XOR", "DECODER"];

const Index = () => {
  const [selectedGate, setSelectedGate] = useState<GateType | null>(null);
  const [binaryInput, setBinaryInput] = useState<string>("");

  const handleBinaryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^01]/g, "").slice(0, 5);
    setBinaryInput(value);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-minecraft text-redstone mb-8 text-center">
          Minecraft Logic Gate Builder
        </h1>
        
        <div className="mb-8">
          <h2 className="text-xl mb-4 font-minecraft text-gray-300">
            Select a Logic Gate:
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {GATES.map((gate) => (
              <LogicGate
                key={gate}
                type={gate}
                selected={selectedGate === gate}
                onClick={() => setSelectedGate(gate)}
              />
            ))}
          </div>
        </div>

        {selectedGate && (
          <div className="space-y-6">
            <div className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-lg font-minecraft mb-4 text-cmdblock">
                {selectedGate} Gate Selected
              </h3>
              
              {selectedGate === "DECODER" && (
                <div className="mb-4">
                  <Label htmlFor="binary-input" className="text-gray-300 mb-2 block">
                    Enter 5-bit binary number (e.g., 10101):
                  </Label>
                  <Input
                    id="binary-input"
                    type="text"
                    value={binaryInput}
                    onChange={handleBinaryInputChange}
                    placeholder="00000"
                    className="font-minecraft bg-gray-800 text-gray-100 border-gray-700"
                    maxLength={5}
                  />
                </div>
              )}

              <p className="text-gray-400 mb-4">
                {selectedGate === "DECODER" 
                  ? "This will create a line of glowstones based on your binary input."
                  : `This will create a ${selectedGate} gate at your current position.`}
                Make sure you have enough space!
              </p>
              
              <CommandOutput 
                command={generateCommand(selectedGate, selectedGate === "DECODER" ? binaryInput : undefined)} 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;