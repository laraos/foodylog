/**
 * Convex Connection Test Component
 * 
 * This component tests the Convex backend connection by calling test functions.
 * It demonstrates both queries (real-time subscriptions) and mutations.
 * This component will be removed once the real meal functionality is implemented.
 * 
 * Features tested:
 * - Basic query execution
 * - Real-time data updates
 * - Mutation execution
 * - Error handling
 * - Connection status
 */

import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export const ConvexTest: React.FC = () => {
  const [testMessage, setTestMessage] = useState('Hello from FoodyLog!');
  const [mutationResult, setMutationResult] = useState<any>(null);

  // Test query - this will automatically update when data changes
  const testQueryResult = useQuery(api.functions.test.testQuery);

  // Test query with arguments
  const testQueryWithArgsResult = useQuery(api.functions.test.testQueryWithArgs, {
    name: 'FoodyLog User',
    count: 42,
  });

  // Connection test query
  const connectionTestResult = useQuery(api.functions.test.connectionTest);

  // Test mutation
  const testMutation = useMutation(api.functions.test.testMutation);

  const handleTestMutation = async () => {
    try {
      const result = await testMutation({ message: testMessage });
      setMutationResult(result);
    } catch (error) {
      console.error('Mutation failed:', error);
      setMutationResult({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        🧪 Convex Backend Connection Test
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Query Test */}
        <div className="bg-white rounded-lg shadow-md p-4 border">
          <h3 className="text-lg font-semibold mb-3 text-green-700">
            📡 Basic Query Test
          </h3>
          {testQueryResult ? (
            <div className="space-y-2">
              <p><strong>Message:</strong> {testQueryResult.message}</p>
              <p><strong>Timestamp:</strong> {new Date(testQueryResult.timestamp).toLocaleString()}</p>
              <p><strong>Environment:</strong> {testQueryResult.environment}</p>
              <p><strong>Deployment:</strong> {testQueryResult.deployment}</p>
              <div className="text-sm text-green-600 mt-2">
                ✅ Query successful - Real-time updates working!
              </div>
            </div>
          ) : (
            <div className="text-gray-500">Loading query result...</div>
          )}
        </div>

        {/* Query with Arguments Test */}
        <div className="bg-white rounded-lg shadow-md p-4 border">
          <h3 className="text-lg font-semibold mb-3 text-blue-700">
            🎯 Query with Arguments Test
          </h3>
          {testQueryWithArgsResult ? (
            <div className="space-y-2">
              <p><strong>Greeting:</strong> {testQueryWithArgsResult.greeting}</p>
              <p><strong>Timestamp:</strong> {new Date(testQueryWithArgsResult.timestamp).toLocaleString()}</p>
              <div className="text-sm text-blue-600 mt-2">
                ✅ Parameterized query successful!
              </div>
            </div>
          ) : (
            <div className="text-gray-500">Loading parameterized query...</div>
          )}
        </div>

        {/* Connection Test */}
        <div className="bg-white rounded-lg shadow-md p-4 border">
          <h3 className="text-lg font-semibold mb-3 text-purple-700">
            🔗 Connection Status Test
          </h3>
          {connectionTestResult ? (
            <div className="space-y-2">
              <p><strong>Status:</strong>
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                  {connectionTestResult.status}
                </span>
              </p>
              <p><strong>Backend:</strong> {connectionTestResult.backend}</p>
              <p><strong>Project:</strong> {connectionTestResult.project}</p>
              <p><strong>Server Time:</strong> {connectionTestResult.serverTime}</p>
              <div className="text-sm text-purple-600 mt-2">
                {connectionTestResult.message}
              </div>
            </div>
          ) : (
            <div className="text-gray-500">Testing connection...</div>
          )}
        </div>

        {/* Mutation Test */}
        <div className="bg-white rounded-lg shadow-md p-4 border">
          <h3 className="text-lg font-semibold mb-3 text-orange-700">
            ⚡ Mutation Test
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Test Message:
              </label>
              <input
                type="text"
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter a test message..."
              />
            </div>

            <button
              onClick={handleTestMutation}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
            >
              Send Test Mutation
            </button>

            {mutationResult && (
              <div className="mt-3 p-3 bg-gray-50 rounded border">
                <h4 className="font-medium mb-2">Mutation Result:</h4>
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify(mutationResult, null, 2)}
                </pre>
                {mutationResult.error ? (
                  <div className="text-sm text-red-600 mt-2">
                    ❌ Mutation failed
                  </div>
                ) : (
                  <div className="text-sm text-orange-600 mt-2">
                    ✅ Mutation successful!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">
          🎉 What This Test Demonstrates
        </h3>
        <ul className="list-disc list-inside space-y-1 text-blue-700">
          <li><strong>Real-time Queries:</strong> Data updates automatically without page refresh</li>
          <li><strong>Parameterized Queries:</strong> Functions can accept and process arguments</li>
          <li><strong>Mutations:</strong> Data can be sent to and processed by the backend</li>
          <li><strong>Error Handling:</strong> Failed operations are caught and displayed</li>
          <li><strong>TypeScript Integration:</strong> Full type safety with generated API types</li>
          <li><strong>Connection Status:</strong> Backend connectivity is verified</li>
        </ul>

        <div className="mt-4 p-3 bg-green-100 rounded border border-green-300">
          <p className="text-green-800 font-medium">
            ✅ If you can see data above, your Convex backend is working perfectly!
          </p>
          <p className="text-green-700 text-sm mt-1">
            This test component will be removed once real meal functionality is implemented.
          </p>
        </div>
      </div>
    </div>
  );
};