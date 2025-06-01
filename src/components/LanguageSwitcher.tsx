
import React from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Globe, ChevronDown } from "lucide-react";
import { useLanguage, supportedLanguages } from '@/context/LanguageContext';

interface LanguageSwitcherProps {
  variant?: 'default' | 'minimal';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'default' }) => {
  const { currentLanguage, setLanguage } = useLanguage();

  if (variant === 'minimal') {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <span className="text-lg">{currentLanguage.flag}</span>
            <span className="hidden sm:inline">{currentLanguage.code.toUpperCase()}</span>
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {supportedLanguages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => setLanguage(language)}
              className={`flex items-center gap-3 ${
                currentLanguage.code === language.code ? 'bg-blue-50' : ''
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="flex-1">{language.nativeName}</span>
              {currentLanguage.code === language.code && (
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.name}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {supportedLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language)}
            className={`flex items-center gap-3 ${
              currentLanguage.code === language.code ? 'bg-blue-50' : ''
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <div className="flex-1">
              <div className="font-medium">{language.nativeName}</div>
              <div className="text-xs text-gray-500">{language.name}</div>
            </div>
            {currentLanguage.code === language.code && (
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
