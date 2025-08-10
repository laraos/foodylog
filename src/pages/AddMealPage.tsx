/**
 * AddMealPage - Add new meal page
 * 
 * Placeholder page for meal creation functionality.
 * Will be implemented in Sprint 2 as part of Epic 2.2: Meal Form & Data Model.
 */

export function AddMealPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Add New Meal
        </h1>
        <p className="text-muted-foreground">
          Log your meal with photos and details
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">📸</div>
        <h2 className="text-xl font-semibold mb-2">Meal Logging Coming Soon</h2>
        <p className="text-muted-foreground">
          This feature will be available in Sprint 2. You&apos;ll be able to take photos, rate your meals, and add details like location and price.
        </p>
      </div>
    </div>
  );
}