import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { ScrollArea } from '../../components/ui/scroll-area';
import { mockRoadmaps, mockTalent, mockTalentProgress } from '../../mockData';
import { ArrowLeft, CheckCircle2, Sparkles, Send, Video, BookOpen, CheckSquare, FileQuestion, Presentation, Users } from 'lucide-react';
import { toast } from 'sonner';
import { AIMessage } from '../../types';

const stepIcons = {
  Video,
  Reading: BookOpen,
  Task: CheckSquare,
  Quiz: FileQuestion,
  Simulator: Presentation,
  Meeting: Users,
};

export default function RoadmapStepPage() {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m your AI assistant for this step. I\'m here to help you understand the content and answer any questions you might have. Feel free to ask me anything!',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentTalent = mockTalent[0];
  const roadmap = mockRoadmaps.find(r => r.roleId === currentTalent.roleId);
  const step = roadmap?.steps.find(s => s.id === stepId);
  const progress = mockTalentProgress.find(p => p.talentId === currentTalent.id);

  useEffect(() => {
    if (progress?.completedSteps.includes(stepId || '')) {
      setIsCompleted(true);
    }
  }, [stepId, progress]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  if (!step) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">Step not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const Icon = stepIcons[step.type];

  const handleCompleteStep = () => {
    setIsCompleted(true);
    toast.success('Step completed! Great work! 🎉');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage: AIMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: userInput,
      timestamp: new Date().toISOString(),
    };

    setAiMessages([...aiMessages, userMessage]);
    setUserInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: generateAIResponse(userInput, step.title),
        timestamp: new Date().toISOString(),
      };
      setAiMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (question: string, stepTitle: string): string => {
    const responses = [
      `Great question about "${stepTitle}"! Let me help you understand this better. The key concept here is to focus on practical application and hands-on experience.`,
      `I understand you're curious about this topic. In the context of ${stepTitle}, it's important to remember that learning is a journey. Take your time to absorb the material.`,
      `That's an excellent point to clarify! For this step, I recommend breaking down the content into smaller chunks and practicing each part before moving forward.`,
      `Good thinking! To better understand ${stepTitle}, try relating it to real-world scenarios you might encounter in your role. This will help solidify your understanding.`,
      `I'm here to support your learning journey! Remember, if something isn't clear about ${stepTitle}, don't hesitate to review the materials or ask for additional examples.`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getNextStep = () => {
    if (!roadmap) return null;
    const currentIndex = roadmap.steps.findIndex(s => s.id === stepId);
    return currentIndex < roadmap.steps.length - 1 ? roadmap.steps[currentIndex + 1] : null;
  };

  const nextStep = getNextStep();

  return (
    <div className="p-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          className="gap-2 mb-4"
          onClick={() => navigate('/talent/roadmap')}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Roadmap
        </Button>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Icon className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{step.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{step.type}</Badge>
                <span className="text-sm text-gray-600">{step.duration} minutes</span>
              </div>
            </div>
          </div>
          {isCompleted && (
            <Badge className="gap-1 bg-green-500">
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{step.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{step.content}</p>
              </div>

              {step.resources && step.resources.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
                  <div className="space-y-2">
                    {step.resources.map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.url}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-8 h-8 bg-indigo-100 rounded flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{resource.title}</p>
                          <p className="text-xs text-gray-500">{resource.type}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    {isCompleted ? 'Step Completed!' : 'Ready to move forward?'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isCompleted
                      ? nextStep
                        ? 'Continue to the next step in your journey'
                        : 'You\'ve completed all steps!'
                      : 'Mark this step as complete to continue'}
                  </p>
                </div>
                <div className="flex gap-3">
                  {!isCompleted && (
                    <Button
                      onClick={handleCompleteStep}
                      className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Mark Complete
                    </Button>
                  )}
                  {isCompleted && nextStep && (
                    <Button
                      onClick={() => navigate(`/talent/roadmap/step/${nextStep.id}`)}
                      className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    >
                      Next Step
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant Sidebar */}
        {step.aiAssistantEnabled && (
          <div className="lg:col-span-1">
            <Card className="sticky top-8 h-[calc(100vh-12rem)] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle>AI Assistant</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {aiMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg p-3 ${
                            message.role === 'user'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                <Separator />
                <div className="p-4">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Ask a question..."
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" className="bg-indigo-600 hover:bg-indigo-700">
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
