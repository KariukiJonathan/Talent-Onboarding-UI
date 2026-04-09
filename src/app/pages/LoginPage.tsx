import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';
import { UserCircle2, Users, Info } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRecruiterLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/recruiter');
  };

  const handleTalentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/talent');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Tana
          </h1>
          <p className="text-gray-600 mt-2">
            Connecting Kenyan talent with global opportunities
          </p>
        </div>

        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-sm text-blue-900">
            Demo Mode: Enter any email/password to explore the platform
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="talent" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="talent" className="gap-2">
              <UserCircle2 className="w-4 h-4" />
              Talent
            </TabsTrigger>
            <TabsTrigger value="recruiter" className="gap-2">
              <Users className="w-4 h-4" />
              Recruiter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="talent">
            <Card>
              <CardHeader>
                <CardTitle>Talent Login</CardTitle>
                <CardDescription>
                  Access your onboarding roadmap and learning resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTalentLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="talent-email">Email</Label>
                    <Input
                      id="talent-email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="talent-password">Password</Label>
                    <Input
                      id="talent-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                    Login as Talent
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recruiter">
            <Card>
              <CardHeader>
                <CardTitle>Recruiter Login</CardTitle>
                <CardDescription>
                  Manage companies, roles, and talent onboarding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRecruiterLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recruiter-email">Email</Label>
                    <Input
                      id="recruiter-email"
                      type="email"
                      placeholder="recruiter@tana.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recruiter-password">Password</Label>
                    <Input
                      id="recruiter-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Login as Recruiter
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Platform Features</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <span className="text-indigo-600">•</span>
              <p><strong>Recruiters:</strong> Manage companies, roles, talent & build custom roadmaps</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600">•</span>
              <p><strong>Talent:</strong> Follow personalized roadmaps, use AI assistant & practice scenarios</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}