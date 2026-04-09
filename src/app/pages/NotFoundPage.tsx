import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="mb-6">
              <h1 className="text-6xl font-bold text-indigo-600 mb-2">404</h1>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
              <p className="text-gray-600">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Link to="/">
                <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                  <Home className="w-4 h-4" />
                  Go Home
                </Button>
              </Link>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
