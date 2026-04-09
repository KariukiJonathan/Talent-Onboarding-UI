import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockTalent, mockRoadmaps, mockTalentProgress } from '../../mockData';
import { CheckCircle2, Circle, Lock, Video, BookOpen, CheckSquare, FileQuestion, Presentation, Users, ArrowRight, Clock } from 'lucide-react';

const stepIcons = {
  Video,
  Reading: BookOpen,
  Task: CheckSquare,
  Quiz: FileQuestion,
  Simulator: Presentation,
  Meeting: Users,
};

export default function RoadmapExperiencePage() {
  // Mock current user as Sarah Kimani (talent id: 1)
  const currentTalent = mockTalent[0];
  const roadmap = mockRoadmaps.find(r => r.roleId === currentTalent.roleId);
  const progress = mockTalentProgress.find(p => p.talentId === currentTalent.id);

  if (!roadmap) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">No roadmap assigned yet</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStepStatus = (stepId: string, index: number) => {
    if (progress?.completedSteps.includes(stepId)) {
      return 'completed';
    }
    if (stepId === progress?.currentStepId) {
      return 'current';
    }
    // Allow access to next step after current
    const currentIndex = roadmap.steps.findIndex(s => s.id === progress?.currentStepId);
    if (index <= currentIndex + 1) {
      return 'available';
    }
    return 'locked';
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{roadmap.title}</h1>
        <p className="text-gray-600 mt-1">{roadmap.description}</p>
      </div>

      {/* Progress Summary */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Overall Progress</p>
              <p className="text-3xl font-bold text-indigo-600">{currentTalent.progress}%</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Steps Completed</p>
              <p className="text-3xl font-bold text-gray-900">
                {progress?.completedSteps.length || 0}/{roadmap.steps.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Estimated Duration</p>
              <p className="text-3xl font-bold text-gray-900">{roadmap.estimatedDuration} days</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roadmap Steps */}
      <div className="space-y-4">
        {roadmap.steps.map((step, index) => {
          const status = getStepStatus(step.id, index);
          const Icon = stepIcons[step.type];
          const isAccessible = status !== 'locked';

          return (
            <Card
              key={step.id}
              className={`relative ${
                status === 'current' ? 'border-indigo-500 border-2 bg-indigo-50' :
                status === 'completed' ? 'border-green-200 bg-green-50' :
                status === 'locked' ? 'opacity-60' : ''
              }`}
            >
              {/* Connector Line */}
              {index < roadmap.steps.length - 1 && (
                <div className="absolute left-[52px] top-[80px] w-0.5 h-8 bg-gray-200" />
              )}
              
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    status === 'completed' ? 'bg-green-500' :
                    status === 'current' ? 'bg-indigo-500' :
                    status === 'locked' ? 'bg-gray-300' :
                    'bg-gray-200'
                  }`}>
                    {status === 'completed' ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : status === 'locked' ? (
                      <Lock className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-600" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">Step {index + 1}</span>
                        <Badge variant="outline" className="gap-1">
                          <Icon className="w-3 h-3" />
                          {step.type}
                        </Badge>
                        {step.aiAssistantEnabled && (
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            AI Assisted
                          </Badge>
                        )}
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          {step.duration} min
                        </span>
                      </div>
                      {status === 'completed' && (
                        <Badge className="bg-green-500">Completed</Badge>
                      )}
                      {status === 'current' && (
                        <Badge className="bg-indigo-500">In Progress</Badge>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>

                    {isAccessible && status !== 'completed' && (
                      <Link to={`/talent/roadmap/step/${step.id}`}>
                        <Button
                          className={`gap-2 ${
                            status === 'current'
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                              : 'bg-indigo-600 hover:bg-indigo-700'
                          }`}
                        >
                          {status === 'current' ? 'Continue' : 'Start'}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}

                    {status === 'completed' && (
                      <Link to={`/talent/roadmap/step/${step.id}`}>
                        <Button variant="outline" className="gap-2">
                          Review
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}

                    {status === 'locked' && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Lock className="w-4 h-4" />
                        Complete previous steps to unlock
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
