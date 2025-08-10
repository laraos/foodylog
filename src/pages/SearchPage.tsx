/**
 * SearchPage - Meal search and filtering page
 * 
 * Placeholder page for meal search functionality.
 * Will be implemented in Sprint 3 as part of Epic 3.2: Search & Filtering.
 */

export function SearchPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Search Meals
        </h1>
        <p className="text-muted-foreground">
          Find and filter your meal history
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-xl font-semibold mb-2">Search Coming Soon</h2>
        <p className="text-muted-foreground">
          This feature will be available in Sprint 3. You'll be able to search your meals by title, location, tags, and more.
        </p>
      </div>
    </div>
  );
}