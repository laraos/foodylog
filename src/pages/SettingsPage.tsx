/**
 * SettingsPage - App settings and preferences page
 * 
 * Placeholder page for settings functionality.
 * Will be expanded in future sprints with user preferences, account settings, etc.
 */

import { useTheme } from '../lib/theme';
import { Button } from '../components/ui/button';

export function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Customize your FoodyLog experience
        </p>
      </div>

      <div className="space-y-4">
        {/* Theme Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-3">
              Choose your preferred theme
            </p>
            <div className="flex gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleThemeChange('light')}
              >
                ☀️ Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleThemeChange('dark')}
              >
                🌙 Dark
              </Button>
              <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleThemeChange('system')}
              >
                🖥️ System
              </Button>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">⚙️</div>
          <h2 className="text-lg font-semibold mb-2">More Settings Coming Soon</h2>
          <p className="text-muted-foreground text-sm">
            Additional settings like notifications, data export, and account management will be added in future updates.
          </p>
        </div>
      </div>
    </div>
  );
}