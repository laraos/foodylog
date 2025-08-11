/**
 * Convex Test Page Component
 * 
 * This component tests all aspects of the Convex backend integration:
 * 1. Basic query and mutation operations
 * 2. Real-time subscriptions and live updates
 * 3. Authentication integration
 * 4. Error handling and connection status
 * 
 * This component demonstrates that the Convex backend is properly
 * configured and working with the React frontend.
 */

import { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { AlertCircle, CheckCircle, Wifi, WifiOff } from 'lucide-react';

export function ConvexTestPage() {
    const [testMessage, setTestMessage] = useState('Hello Convex!');
    const [mealTitle, setMealTitle] = useState('Test Meal');
    const [mealRating, setMealRating] = useState(8);

    // Test queries - these will update in real-time
    const connectionTest = useQuery(api.functions.test.connectionTest);
    const testQuery = useQuery(api.functions.test.testQuery);
    const currentUser = useQuery(api.functions.users.getCurrentUser);
    const testUser = useQuery(api.functions.setup.getTestUser);

    // Only query meals if test user exists
    const userMeals = useQuery(
        api.functions.meals.getUserMeals,
        testUser ? { limit: 5 } : "skip"
    );

    // Test mutations
    const testMutation = useMutation(api.functions.test.testMutation);
    const createMeal = useMutation(api.functions.meals.createMeal);
    const createTestUser = useMutation(api.functions.setup.createTestUser);

    // State for testing
    const [mutationResult, setMutationResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initialize test user
    const handleCreateTestUser = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const userId = await createTestUser();
            setMutationResult({ userId, message: 'Test user created successfully!' });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    };

    // Test basic mutation
    const handleTestMutation = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const result = await testMutation({ message: testMessage });
            setMutationResult(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    };

    // Test meal creation
    const handleCreateMeal = async () => {
        try {
            setIsLoading(true);
            setError(null);

            // First ensure test user exists
            if (!testUser) {
                await createTestUser();
            }

            const mealId = await createMeal({
                title: mealTitle,
                rating: mealRating,
                mealType: 'lunch',
                description: 'Test meal created from Convex test page',
                tags: ['test', 'convex'],
                mealDate: Date.now(),
            });

            setMutationResult({ mealId, message: 'Meal created successfully!' });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Convex Backend Test</h1>
                <p className="text-muted-foreground">
                    Testing Convex integration, real-time subscriptions, and CRUD operations
                </p>
            </div>

            {/* Connection Status */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {connectionTest ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                        Connection Status
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {connectionTest ? (
                        <div className="space-y-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                                <Wifi className="h-3 w-3 mr-1" />
                                Connected
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                                Backend: {connectionTest.backend} | Project: {connectionTest.project}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Server Time: {new Date(connectionTest.serverTime).toLocaleString()}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Badge variant="destructive">
                                <WifiOff className="h-3 w-3 mr-1" />
                                Disconnected
                            </Badge>
                            <p className="text-sm text-muted-foreground">
                                Unable to connect to Convex backend
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Real-time Query Test */}
            <Card>
                <CardHeader>
                    <CardTitle>Real-time Query Test</CardTitle>
                    <CardDescription>
                        This data updates automatically when the backend changes
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {testQuery ? (
                        <div className="space-y-2">
                            <p><strong>Message:</strong> {testQuery.message}</p>
                            <p><strong>Timestamp:</strong> {new Date(testQuery.timestamp).toLocaleString()}</p>
                            <p><strong>Environment:</strong> {testQuery.environment}</p>
                            <Badge variant="outline">Real-time Updates Active</Badge>
                        </div>
                    ) : (
                        <LoadingSpinner />
                    )}
                </CardContent>
            </Card>

            {/* User Authentication Test */}
            <Card>
                <CardHeader>
                    <CardTitle>Authentication Test</CardTitle>
                    <CardDescription>
                        Current user information from Clerk + Convex integration
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Clerk User */}
                        <div>
                            <h4 className="font-medium mb-2">Clerk User:</h4>
                            {currentUser ? (
                                <div className="space-y-2">
                                    <p><strong>User ID:</strong> {currentUser._id}</p>
                                    <p><strong>Email:</strong> {currentUser.email}</p>
                                    <p><strong>Name:</strong> {currentUser.firstName} {currentUser.lastName}</p>
                                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                        Clerk Authenticated
                                    </Badge>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Badge variant="destructive">Not Authenticated</Badge>
                                    <p className="text-sm text-muted-foreground">
                                        Please sign in to test Clerk features
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Test User */}
                        <div>
                            <h4 className="font-medium mb-2">Test User (for Convex testing):</h4>
                            {testUser ? (
                                <div className="space-y-2">
                                    <p><strong>User ID:</strong> {testUser._id}</p>
                                    <p><strong>Email:</strong> {testUser.email}</p>
                                    <p><strong>Name:</strong> {testUser.firstName} {testUser.lastName}</p>
                                    <p><strong>Meals:</strong> {testUser.stats?.totalMeals || 0}</p>
                                    <Badge variant="outline" className="bg-green-50 text-green-700">
                                        Test User Ready
                                    </Badge>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Badge variant="secondary">No Test User</Badge>
                                    <p className="text-sm text-muted-foreground">
                                        Create a test user to test Convex functions
                                    </p>
                                    <Button
                                        onClick={handleCreateTestUser}
                                        disabled={isLoading}
                                        size="sm"
                                    >
                                        {isLoading ? <LoadingSpinner /> : 'Create Test User'}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Mutation Tests */}
            <Card>
                <CardHeader>
                    <CardTitle>Mutation Tests</CardTitle>
                    <CardDescription>
                        Test backend mutations and data persistence
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Basic Mutation Test */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Test Message:</label>
                        <div className="flex gap-2">
                            <Input
                                value={testMessage}
                                onChange={(e) => setTestMessage(e.target.value)}
                                placeholder="Enter test message"
                            />
                            <Button
                                onClick={handleTestMutation}
                                disabled={isLoading}
                            >
                                {isLoading ? <LoadingSpinner /> : 'Send Test'}
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Meal Creation Test */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Create Test Meal:</label>
                        <div className="flex gap-2">
                            <Input
                                value={mealTitle}
                                onChange={(e) => setMealTitle(e.target.value)}
                                placeholder="Meal title"
                            />
                            <Input
                                type="number"
                                min="1"
                                max="10"
                                value={mealRating}
                                onChange={(e) => setMealRating(Number(e.target.value))}
                                className="w-20"
                            />
                            <Button
                                onClick={handleCreateMeal}
                                disabled={isLoading || !currentUser}
                            >
                                {isLoading ? <LoadingSpinner /> : 'Create Meal'}
                            </Button>
                        </div>
                        {!currentUser && (
                            <p className="text-sm text-muted-foreground">
                                Sign in required to create meals
                            </p>
                        )}
                    </div>

                    {/* Results */}
                    {mutationResult && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                            <p className="text-sm font-medium text-green-800">Success!</p>
                            <pre className="text-xs text-green-700 mt-1">
                                {JSON.stringify(mutationResult, null, 2)}
                            </pre>
                        </div>
                    )}

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm font-medium text-red-800">Error:</p>
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* User Meals (Real-time) */}
            <Card>
                <CardHeader>
                    <CardTitle>User Meals (Real-time)</CardTitle>
                    <CardDescription>
                        Your recent meals - updates automatically when new meals are added
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {userMeals === undefined ? (
                        <LoadingSpinner />
                    ) : userMeals === null ? (
                        <p className="text-muted-foreground">Sign in to view your meals</p>
                    ) : userMeals.length === 0 ? (
                        <p className="text-muted-foreground">No meals yet. Create one above!</p>
                    ) : (
                        <div className="space-y-3">
                            {userMeals.map((meal) => (
                                <div key={meal._id} className="p-3 border rounded-md">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium">{meal.title}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {meal.mealType} • Rating: {meal.rating}/10
                                            </p>
                                            {meal.description && (
                                                <p className="text-sm mt-1">{meal.description}</p>
                                            )}
                                        </div>
                                        <Badge variant="outline">
                                            {new Date(meal.mealDate).toLocaleDateString()}
                                        </Badge>
                                    </div>
                                    {meal.tags.length > 0 && (
                                        <div className="flex gap-1 mt-2">
                                            {meal.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}