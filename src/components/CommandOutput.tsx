import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy } from "lucide-react";

interface CommandOutputProps {
  command: string;
}

export function CommandOutput({ command }: CommandOutputProps) {
  const copyCommand = () => {
    navigator.clipboard.writeText(command);
    toast.success("Command copied to clipboard!");
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 mt-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400 mb-2">Command Output:</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyCommand}
          className="hover:text-redstone"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <pre className="font-minecraft text-cmdblock text-sm overflow-x-auto p-2 bg-gray-950 rounded">
        {command}
      </pre>
    </div>
  );
}