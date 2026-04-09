import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { mockTalent, mockCompanies, mockRoles, mockRoadmaps, mockTalentProgress } from '../../mockData';
import { ArrowRight, Sparkles, CheckCircle2, Clock, Award, TrendingUp } from 'lucide-react';

export default function TalentDashboard() {
  // Mock current user as Sarah Kimani (talent id: 1)
  const currentTalent = mockTalent[0];
  const company = mockCompanies.find(c => c.id === currentTalent.companyId);
  const role = mockRoles.find(r => r.id === currentTalent.roleId);
  const roadmap = mockRoadmaps.find(r => r.roleId === currentTalent.roleId);
  const progress = mockTalentProgress.find(p => p.talentId === currentTalent.id);

  const currentStep = roadmap?.steps.find(s => s.id === progress?.currentStepId);
  const completedCount = progress?.completedSteps.length || 0;
  const totalSteps = roadmap?.steps.length || 0;
  const remainingSteps = totalSteps - completedCount;

  return (
    <div className="p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {currentTalent.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          {role?.title} at {company?.name}
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Onboarding Journey</CardTitle>
                <CardDescription>{roadmap?.title}</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-indigo-600">{currentTalent.progress}%</p>
                <p className="text-sm text-gray-500">Complete</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={currentTalent.progress} className="mb-4 h-3" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                <p className="text-xs text-gray-600">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-600">{remainingSteps}</p>
                <p className="text-xs text-gray-600">Remaining</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalSteps}</p>
                <p className="text-xs text-gray-600">Total Steps</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Days Active</p>
                <p className="font-semibold">7 days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="font-semibold">+15% progress</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Achievements</p>
                <p className="font-semibold">3 earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Step */}
      {currentStep && (
        <Card className="mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <CardTitle>Continue Your Journey</CardTitle>
            </div>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded">
                    {currentStep.type}
                  </span>
                  <span className="text-sm text-gray-600">{currentStep.duration} minutes</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{currentStep.title}</h3>
                <p className="text-gray-600">{currentStep.description}</p>
              </div>
              <Link to={`/talent/roadmap/step/${currentStep.id}`}>
                <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recently Completed</CardTitle>
            <CardDescription>Your latest achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {roadmap?.steps
                .filter(s => progress?.completedSteps.includes(s.id))
                .slice(-3)
                .map((step) => (
                  <div key={step.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{step.title}</p>
                      <p className="text-sm text-gray-600">{step.type} • {step.duration} min</p>
                    </div>
                  </div>
                ))}
              {(!progress?.completedSteps || progress.completedSteps.length === 0) && (
                <p className="text-center text-gray-500 py-4">No completed steps yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Explore your learning tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to="/talent/roadmap">
              <Button variant="outline" className="w-full justify-start gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">View Full Roadmap</p>
                  <p className="text-xs text-gray-500">See all your learning steps</p>
                </div>
              </Button>
            </Link>
            <Link to="/talent/simulator">
              <Button variant="outline" className="w-full justify-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Workplace Simulator</p>
                  <p className="text-xs text-gray-500">Practice real scenarios</p>
                </div>
              </Button>
            </Link>
            <Link to="/talent/progress">
              <Button variant="outline" className="w-full justify-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Track Progress</p>
                  <p className="text-xs text-gray-500">View detailed analytics</p>
                </div>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
