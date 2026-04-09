import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';
import { mockTalent, mockRoadmaps, mockTalentProgress, mockCompanies, mockRoles } from '../../mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { TrendingUp, Award, Target, Clock, CheckCircle2, Video, BookOpen, CheckSquare, FileQuestion, Presentation, Users } from 'lucide-react';

const stepIcons = {
  Video,
  Reading: BookOpen,
  Task: CheckSquare,
  Quiz: FileQuestion,
  Simulator: Presentation,
  Meeting: Users,
};

export default function TalentProgressPage() {
  const currentTalent = mockTalent[0];
  const company = mockCompanies.find(c => c.id === currentTalent.companyId);
  const role = mockRoles.find(r => r.id === currentTalent.roleId);
  const roadmap = mockRoadmaps.find(r => r.roleId === currentTalent.roleId);
  const progress = mockTalentProgress.find(p => p.talentId === currentTalent.id);

  const completedCount = progress?.completedSteps.length || 0;
  const totalSteps = roadmap?.steps.length || 0;
  const remainingSteps = totalSteps - completedCount;

  // Mock weekly progress data
  const weeklyProgressData = [
    { week: 'Week 1', progress: 15, hours: 8 },
    { week: 'Week 2', progress: 35, hours: 12 },
    { week: 'Week 3', progress: 50, hours: 10 },
    { week: 'Week 4', progress: 65, hours: 14 },
  ];

  // Steps by type
  const stepsByType = roadmap?.steps.reduce((acc, step) => {
    const completed = progress?.completedSteps.includes(step.id) ? 1 : 0;
    const existing = acc.find(item => item.type === step.type);
    if (existing) {
      existing.total += 1;
      existing.completed += completed;
    } else {
      acc.push({ type: step.type, total: 1, completed });
    }
    return acc;
  }, [] as Array<{ type: string; total: number; completed: number }>) || [];

  const achievements = [
    { id: '1', title: 'Quick Starter', description: 'Completed first step within 24 hours', earned: true },
    { id: '2', title: 'Consistent Learner', description: 'Active for 7 consecutive days', earned: true },
    { id: '3', title: 'Halfway Hero', description: 'Completed 50% of roadmap', earned: true },
    { id: '4', title: 'Speed Runner', description: 'Complete roadmap ahead of schedule', earned: false },
    { id: '5', title: 'Perfect Score', description: 'Score 100% on all quizzes', earned: false },
    { id: '6', title: 'Team Player', description: 'Attended all team meetings', earned: false },
  ];

  const estimatedCompletion = roadmap ? 
    new Date(Date.now() + (remainingSteps * 2 * 24 * 60 * 60 * 1000)).toLocaleDateString() : 
    'N/A';

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Progress</h1>
        <p className="text-gray-600 mt-1">Track your onboarding journey and achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Overall Progress
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">{currentTalent.progress}%</div>
            <Progress value={currentTalent.progress} className="mb-2" />
            <p className="text-xs text-gray-500">{completedCount} of {totalSteps} steps</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Time Invested
            </CardTitle>
            <Clock className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">44 hrs</div>
            <p className="text-xs text-gray-500 mt-1">Total learning time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Completion Date
            </CardTitle>
            <Target className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-gray-900">{estimatedCompletion}</div>
            <p className="text-xs text-gray-500 mt-1">Estimated completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Achievements
            </CardTitle>
            <Award className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {achievements.filter(a => a.earned).length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Badges earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Role Info */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Role</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {currentTalent.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{currentTalent.name}</h3>
              <p className="text-gray-600">{role?.title} at {company?.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{role?.department}</Badge>
                <Badge variant="outline">{role?.level}</Badge>
                <span className="text-sm text-gray-500">Started {currentTalent.startDate}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Over Time</CardTitle>
            <CardDescription>Your learning journey week by week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="progress" stroke="#4f46e5" name="Progress %" strokeWidth={2} />
                <Line type="monotone" dataKey="hours" stroke="#8b5cf6" name="Hours" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Steps by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Progress by Step Type</CardTitle>
            <CardDescription>Breakdown of completed activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stepsByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#22c55e" name="Completed" />
                <Bar dataKey="total" fill="#e5e7eb" name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Steps Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Roadmap Steps</CardTitle>
          <CardDescription>Detailed progress for each step</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {roadmap?.steps.map((step, index) => {
              const isCompleted = progress?.completedSteps.includes(step.id);
              const isCurrent = step.id === progress?.currentStepId;
              const Icon = stepIcons[step.type];

              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border-2 ${
                    isCompleted ? 'border-green-200 bg-green-50' :
                    isCurrent ? 'border-indigo-200 bg-indigo-50' :
                    'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500' :
                      isCurrent ? 'bg-indigo-500' :
                      'bg-gray-300'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <span className="text-white font-semibold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900">{step.title}</p>
                        <Badge variant="outline" className="gap-1">
                          <Icon className="w-3 h-3" />
                          {step.type}
                        </Badge>
                        {isCurrent && (
                          <Badge className="bg-indigo-500">In Progress</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{step.duration} min</p>
                      {isCompleted && (
                        <p className="text-xs text-green-600 font-medium mt-1">✓ Completed</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Badges you've earned on your journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 ${
                  achievement.earned
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.earned ? 'bg-yellow-400' : 'bg-gray-300'
                  }`}>
                    <Award className={`w-6 h-6 ${achievement.earned ? 'text-yellow-900' : 'text-gray-600'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{achievement.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                    {achievement.earned && (
                      <p className="text-xs text-yellow-700 font-medium mt-2">✓ Unlocked</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
