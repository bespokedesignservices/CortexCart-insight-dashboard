
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Sun, Moon, Monitor, Eye } from "lucide-react";

const ThemeCustomization: React.FC = () => {
  const [theme, setTheme] = useState('light');
  const [accentColor, setAccentColor] = useState('#3b82f6');
  const [customColors, setCustomColors] = useState({
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  });

  const colorPresets = [
    { name: 'Default Blue', primary: '#3b82f6', secondary: '#64748b' },
    { name: 'Purple', primary: '#8b5cf6', secondary: '#6b7280' },
    { name: 'Green', primary: '#10b981', secondary: '#6b7280' },
    { name: 'Orange', primary: '#f97316', secondary: '#6b7280' },
    { name: 'Pink', primary: '#ec4899', secondary: '#6b7280' },
    { name: 'Teal', primary: '#14b8a6', secondary: '#6b7280' }
  ];

  const applyTheme = (newTheme: string) => {
    setTheme(newTheme);
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  const applyColorScheme = (colors: typeof customColors) => {
    setCustomColors(colors);
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--success', colors.success);
    root.style.setProperty('--warning', colors.warning);
    root.style.setProperty('--error', colors.error);
  };

  const resetToDefault = () => {
    const defaultColors = {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    };
    applyColorScheme(defaultColors);
    applyTheme('light');
  };

  useEffect(() => {
    // Load saved theme preferences
    const savedTheme = localStorage.getItem('recoai-theme') || 'light';
    const savedColors = localStorage.getItem('recoai-colors');
    
    setTheme(savedTheme);
    if (savedColors) {
      const colors = JSON.parse(savedColors);
      setCustomColors(colors);
      applyColorScheme(colors);
    }
    applyTheme(savedTheme);
  }, []);

  const savePreferences = () => {
    localStorage.setItem('recoai-theme', theme);
    localStorage.setItem('recoai-colors', JSON.stringify(customColors));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Theme Customization</h2>
        <Palette className="h-6 w-6 text-purple-500" />
      </div>

      <Tabs defaultValue="theme" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => applyTheme('light')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Sun className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <div className="text-sm font-medium">Light</div>
                </button>

                <button
                  onClick={() => applyTheme('dark')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Moon className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-sm font-medium">Dark</div>
                </button>

                <button
                  onClick={() => applyTheme('system')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === 'system' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Monitor className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                  <div className="text-sm font-medium">System</div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-theme">Auto Theme Switching</Label>
                  <p className="text-sm text-gray-600">Automatically switch based on time of day</p>
                </div>
                <Switch id="auto-theme" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Color Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {colorPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyColorScheme({ ...customColors, primary: preset.primary, secondary: preset.secondary })}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }} />
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.secondary }} />
                    </div>
                    <span className="text-sm font-medium">{preset.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(customColors).map(([colorName, colorValue]) => (
                <div key={colorName} className="flex items-center justify-between">
                  <Label htmlFor={colorName} className="capitalize">{colorName}</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      id={colorName}
                      value={colorValue}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, [colorName]: e.target.value }))}
                      className="w-10 h-8 rounded border"
                    />
                    <span className="text-xs text-gray-600 font-mono">{colorValue}</span>
                  </div>
                </div>
              ))}
              
              <Button 
                onClick={() => applyColorScheme(customColors)} 
                className="w-full mt-4"
              >
                Apply Custom Colors
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Theme Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Sample Dashboard</h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded border" style={{ backgroundColor: customColors.primary, color: 'white' }}>
                    <div className="text-sm opacity-80">Primary</div>
                    <div className="text-lg font-bold">$12,540</div>
                  </div>
                  <div className="p-3 rounded border" style={{ backgroundColor: customColors.success, color: 'white' }}>
                    <div className="text-sm opacity-80">Success</div>
                    <div className="text-lg font-bold">+23%</div>
                  </div>
                  <div className="p-3 rounded border" style={{ backgroundColor: customColors.warning, color: 'white' }}>
                    <div className="text-sm opacity-80">Warning</div>
                    <div className="text-lg font-bold">2 Issues</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" style={{ backgroundColor: customColors.primary }}>Primary Button</Button>
                  <Button size="sm" variant="outline">Secondary Button</Button>
                  <Button size="sm" style={{ backgroundColor: customColors.accent }}>Accent Button</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button onClick={savePreferences} className="flex-1">
          Save Theme Preferences
        </Button>
        <Button onClick={resetToDefault} variant="outline">
          Reset to Default
        </Button>
      </div>
    </div>
  );
};

export default ThemeCustomization;
