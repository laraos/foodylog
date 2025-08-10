/**
 * SettingsPage - App settings and preferences page
 * 
 * Comprehensive settings page that includes:
 * - User profile management via Clerk's UserProfile component
 * - FoodyLog-specific preferences (theme, currency, meal defaults)
 * - Account management and security settings
 * - Data export and privacy controls (future)
 * 
 * Implements Story 1.3.3: User Profile Management requirements:
 * - Integrates Clerk's UserProfile component for profile management
 * - Adds FoodyLog-specific user preferences
 * - Creates user settings page with app-specific options
 * - Syncs Clerk user data with Convex user records
 * - Handles account deletion through Clerk
 */

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUserPreferences, useCurrencyPreference, useDefaultMealTypePreference } from '../hooks/useUserPreferences';
import { useTheme } from '../lib/theme';
import { 
  Button, 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger,
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
  Badge, 
} from '../components/ui';
import { UserProfile } from '../components/auth/UserProfile';


/**
 * Currency options for the currency selector
 */
const CURRENCY_OPTIONS = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
];

/**
 * Meal type options for default meal type selector
 */
const MEAL_TYPE_OPTIONS = [
  { value: 'breakfast', label: '🌅 Breakfast', description: 'Morning meals' },
  { value: 'lunch', label: '☀️ Lunch', description: 'Midday meals' },
  { value: 'dinner', label: '🌙 Dinner', description: 'Evening meals' },
  { value: 'snack', label: '🍿 Snack', description: 'Light bites' },
] as const;

export function SettingsPage() {
  const { user, isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();
  const { updatePreferences, isLoading: preferencesLoading, error } = useUserPreferences();
  const { currency, setCurrency } = useCurrencyPreference();
  const { defaultMealType, setDefaultMealType } = useDefaultMealTypePreference();

  // Local state for UI
  const [activeTab, setActiveTab] = useState('profile');
  const [isUpdating, setIsUpdating] = useState(false);

  /**
   * Handle theme change with preference sync
   */
  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    try {
      await updatePreferences({ theme: newTheme });
    } catch (err) {
      console.error('Failed to sync theme preference:', err);
    }
  };

  /**
   * Handle currency change
   */
  const handleCurrencyChange = async (newCurrency: string) => {
    setIsUpdating(true);
    try {
      await setCurrency(newCurrency);
    } catch (err) {
      console.error('Failed to update currency:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Handle default meal type change
   */
  const handleDefaultMealTypeChange = async (newMealType: string) => {
    setIsUpdating(true);
    try {
      await setDefaultMealType(newMealType as 'breakfast' | 'lunch' | 'dinner' | 'snack');
    } catch (err) {
      console.error('Failed to update default meal type:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground">Please sign in to access your settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your profile, preferences, and account settings
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        {/* Profile Tab - Clerk UserProfile Integration */}
        <TabsContent value="profile" className="space-y-6">
          <UserProfile routing="hash" />
        </TabsContent>

        {/* Preferences Tab - FoodyLog-specific preferences */}
        <TabsContent value="preferences" className="space-y-6">
          <div className="grid gap-6">

            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎨 Appearance
                </CardTitle>
                <CardDescription>
                  Customize how FoodyLog looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-3 block">Theme</label>
                  <div className="flex gap-2">
                    <Button
                      variant={theme === 'light' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleThemeChange('light')}
                      disabled={preferencesLoading}
                    >
                      ☀️ Light
                    </Button>
                    <Button
                      variant={theme === 'dark' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleThemeChange('dark')}
                      disabled={preferencesLoading}
                    >
                      🌙 Dark
                    </Button>
                    <Button
                      variant={theme === 'system' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleThemeChange('system')}
                      disabled={preferencesLoading}
                    >
                      🖥️ System
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Choose your preferred color scheme. System will match your device settings.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Meal Logging Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🍽️ Meal Logging
                </CardTitle>
                <CardDescription>
                  Set your default preferences for logging meals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">

                {/* Default Meal Type */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Default Meal Type</label>
                  <Select
                    value={defaultMealType || ''}
                    onValueChange={handleDefaultMealTypeChange}
                    disabled={isUpdating}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select default meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      {MEAL_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <span>{option.label}</span>
                            <span className="text-xs text-muted-foreground">
                              {option.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    This will be pre-selected when adding new meals
                  </p>
                </div>

                {/* Currency */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Currency</label>
                  <Select
                    value={currency}
                    onValueChange={handleCurrencyChange}
                    disabled={isUpdating}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCY_OPTIONS.map((option) => (
                        <SelectItem key={option.code} value={option.code}>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm">{option.symbol}</span>
                            <span>{option.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {option.code}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Used for displaying prices and calculating spending analytics
                  </p>
                </div>

              </CardContent>
            </Card>

            {/* Privacy & Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🔒 Privacy & Data
                </CardTitle>
                <CardDescription>
                  Control your data and privacy settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">🚧</div>
                  <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground text-sm">
                    Data export, privacy controls, and sharing preferences will be available in future updates.
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </TabsContent>

        {/* Account Tab - Account management */}
        <TabsContent value="account" className="space-y-6">
          <div className="grid gap-6">

            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  👤 Account Information
                </CardTitle>
                <CardDescription>
                  Your account details and subscription status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="text-sm">{user?.fullName || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-sm">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Subscription</label>
                    <Badge variant="secondary">Free Tier</Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                    <p className="text-sm">
                      Recently joined
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💎 Subscription
                </CardTitle>
                <CardDescription>
                  Manage your FoodyLog subscription and billing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">💎</div>
                  <h3 className="text-lg font-semibold mb-2">Premium Features Coming Soon</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Upgrade to premium for unlimited photos, advanced analytics, and more features.
                  </p>
                  <Button variant="outline" disabled>
                    Upgrade to Premium
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  ⚠️ Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible account actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Delete Account</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Account deletion is handled through your profile settings above.
                      Navigate to the Profile tab and use Clerk&apos;s account management features.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}