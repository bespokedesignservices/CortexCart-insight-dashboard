
import { Code } from "lucide-react";
import { platformDetails } from "@/utils/platformDetails";

interface PlatformGridProps {
  selectedPlatform: string;
  onPlatformSelect: (platform: string) => void;
}

const PlatformGrid = ({ selectedPlatform, onPlatformSelect }: PlatformGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
      {Object.entries(platformDetails).map(([id, platform]) => (
        <div 
          key={id}
          onClick={() => onPlatformSelect(id)}
          className={`border rounded-lg p-4 flex flex-col items-center justify-center h-32 cursor-pointer transition-all ${
            selectedPlatform === id 
              ? 'border-recoai-purple bg-recoai-purple/5 shadow-sm' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          {platform.logo ? (
            <img 
              src={platform.logo} 
              alt={platform.name} 
              className="h-10 mb-3 object-contain" 
            />
          ) : (
            <div className="h-10 mb-3 w-full flex items-center justify-center">
              <Code size={24} className="text-gray-500" />
            </div>
          )}
          <span className="text-sm font-medium text-center">{platform.name}</span>
        </div>
      ))}
    </div>
  );
};

export default PlatformGrid;
