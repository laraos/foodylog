/**
 * AnalyticsPage - Meal analytics and insights page
 * 
 * Placeholder page for analytics functionality.
 * Will be implemented in Sprint 3 as part of Epic 3.3: Basic Analytics.
 */

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Analytics
        </h1>
        <p className="text-muted-foreground">
          Insights about your eating habits
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-xl font-semibold mb-2">Analytics Coming Soon</h2>
        <p className="text-muted-foreground">
          This feature will be available in Sprint 3. You'll see statistics about your meals, spending trends, and eating patterns.
        </p>
      </div>
    </div>
  );
}