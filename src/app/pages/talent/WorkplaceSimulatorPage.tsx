import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Presentation, MessageSquare, Users, Mail, CheckCircle2, XCircle, Play, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface Scenario {
  id: string;
  title: string;
  description: string;
  category: 'Communication' | 'Teamwork' | 'Problem Solving' | 'Time Management';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  situation: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

const scenarios: Scenario[] = [
  {
    id: '1',
    title: 'First Day Team Meeting',
    description: 'Navigate your first team standup meeting',
    category: 'Communication',
    difficulty: 'Beginner',
    situation: 'It\'s your first day and you\'re attending the daily standup meeting. The team lead asks everyone to share what they\'re working on. How do you introduce yourself and contribute to the discussion?',
    options: [
      {
        id: 'a',
        text: 'Say nothing and just listen since it\'s your first day',
        isCorrect: false,
        feedback: 'While listening is important, it\'s also a great opportunity to introduce yourself briefly. Your team wants to know who you are!',
      },
      {
        id: 'b',
        text: 'Briefly introduce yourself, mention your role, and express enthusiasm about learning from the team',
        isCorrect: true,
        feedback: 'Excellent! This shows professionalism, enthusiasm, and respect for the team\'s time. You\'re making a great first impression!',
      },
      {
        id: 'c',
        text: 'Give a detailed 10-minute presentation about your entire career history',
        isCorrect: false,
        feedback: 'Standups are meant to be brief. A lengthy introduction might take time away from important team updates. Keep it concise!',
      },
    ],
  },
  {
    id: '2',
    title: 'Conflicting Priorities',
    description: 'Manage multiple urgent tasks effectively',
    category: 'Time Management',
    difficulty: 'Intermediate',
    situation: 'Your manager asks you to complete an urgent report by end of day, but you\'re already working on a critical bug fix that\'s blocking the QA team. How do you handle this situation?',
    options: [
      {
        id: 'a',
        text: 'Drop everything and start the report immediately',
        isCorrect: false,
        feedback: 'This might leave the QA team blocked. It\'s important to communicate the impact of switching priorities.',
      },
      {
        id: 'b',
        text: 'Communicate with your manager about the current blocker, discuss priorities, and agree on a plan',
        isCorrect: true,
        feedback: 'Perfect! Clear communication helps everyone understand the situation and make informed decisions about priorities.',
      },
      {
        id: 'c',
        text: 'Try to do both tasks simultaneously without telling anyone',
        isCorrect: false,
        feedback: 'Multitasking on critical items often leads to mistakes. It\'s better to communicate and prioritize effectively.',
      },
    ],
  },
  {
    id: '3',
    title: 'Code Review Feedback',
    description: 'Respond professionally to constructive criticism',
    category: 'Teamwork',
    difficulty: 'Intermediate',
    situation: 'A senior developer leaves comments on your pull request suggesting significant changes to your approach. The feedback is constructive but extensive. How do you respond?',
    options: [
      {
        id: 'a',
        text: 'Get defensive and argue that your approach is correct',
        isCorrect: false,
        feedback: 'Defensiveness can damage working relationships. Code reviews are learning opportunities, not personal attacks.',
      },
      {
        id: 'b',
        text: 'Thank them for the feedback, ask clarifying questions, and implement the suggestions',
        isCorrect: true,
        feedback: 'Excellent response! This shows maturity, willingness to learn, and professionalism. You\'re building a great reputation!',
      },
      {
        id: 'c',
        text: 'Ignore the comments and merge your code anyway',
        isCorrect: false,
        feedback: 'This violates team processes and can introduce bugs. Always address review comments before merging.',
      },
    ],
  },
  {
    id: '4',
    title: 'Client Communication',
    description: 'Handle a difficult client question professionally',
    category: 'Communication',
    difficulty: 'Advanced',
    situation: 'A client emails asking why a feature isn\'t working as expected. You\'re not sure of the answer and the senior team member who knows is on vacation. How do you respond?',
    options: [
      {
        id: 'a',
        text: 'Don\'t reply until the senior team member returns',
        isCorrect: false,
        feedback: 'Leaving clients waiting shows poor communication. It\'s important to acknowledge their concern promptly.',
      },
      {
        id: 'b',
        text: 'Make up an answer to seem knowledgeable',
        isCorrect: false,
        feedback: 'Providing incorrect information damages credibility. Honesty is always the best policy.',
      },
      {
        id: 'c',
        text: 'Acknowledge their email, let them know you\'re investigating, and provide a timeline for a complete answer',
        isCorrect: true,
        feedback: 'Perfect! This shows professionalism and sets clear expectations. Clients appreciate honest, timely communication.',
      },
    ],
  },
];

export default function WorkplaceSimulatorPage() {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const categoryIcons = {
    Communication: MessageSquare,
    Teamwork: Users,
    'Problem Solving': Presentation,
    'Time Management': Mail,
  };

  const handleStartScenario = (scenario: Scenario) => {
    setCurrentScenario(scenario);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || !currentScenario) return;

    const option = currentScenario.options.find(o => o.id === selectedOption);
    setShowFeedback(true);

    if (option?.isCorrect) {
      setScore(score + 1);
      if (!completedScenarios.includes(currentScenario.id)) {
        setCompletedScenarios([...completedScenarios, currentScenario.id]);
      }
      toast.success('Great choice! You handled that well!');
    } else {
      toast.error('Not quite right, but you\'re learning!');
    }
  };

  const handleRetry = () => {
    setCurrentScenario(null);
    setSelectedOption(null);
    setShowFeedback(false);
  };

  const completionPercentage = Math.round((completedScenarios.length / scenarios.length) * 100);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Workplace Simulator</h1>
        <p className="text-gray-600 mt-1">Practice real-world scenarios and build your professional skills</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Scenarios Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {completedScenarios.length}/{scenarios.length}
            </div>
            <Progress value={completionPercentage} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {completedScenarios.length > 0 ? Math.round((score / completedScenarios.length) * 100) : 0}%
            </div>
            <p className="text-sm text-gray-500 mt-1">Correct responses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Total Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-600">{score}</div>
            <p className="text-sm text-gray-500 mt-1">Points earned</p>
          </CardContent>
        </Card>
      </div>

      {!currentScenario ? (
        /* Scenario Selection */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {scenarios.map((scenario) => {
            const Icon = categoryIcons[scenario.category];
            const isCompleted = completedScenarios.includes(scenario.id);

            return (
              <Card key={scenario.id} className={isCompleted ? 'border-green-200 bg-green-50' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{scenario.title}</CardTitle>
                        <CardDescription className="mt-1">{scenario.description}</CardDescription>
                      </div>
                    </div>
                    {isCompleted && (
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline">{scenario.category}</Badge>
                    <Badge
                      variant="outline"
                      className={
                        scenario.difficulty === 'Beginner' ? 'bg-green-50 text-green-700 border-green-200' :
                        scenario.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }
                    >
                      {scenario.difficulty}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => handleStartScenario(scenario)}
                    className="w-full gap-2"
                    variant={isCompleted ? 'outline' : 'default'}
                  >
                    <Play className="w-4 h-4" />
                    {isCompleted ? 'Try Again' : 'Start Scenario'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Active Scenario */
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline">{currentScenario.category}</Badge>
                <Badge
                  variant="outline"
                  className={
                    currentScenario.difficulty === 'Beginner' ? 'bg-green-50 text-green-700 border-green-200' :
                    currentScenario.difficulty === 'Intermediate' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                    'bg-red-50 text-red-700 border-red-200'
                  }
                >
                  {currentScenario.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{currentScenario.title}</CardTitle>
              <CardDescription className="text-base mt-2">{currentScenario.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900 mb-2">Situation:</p>
                <p className="text-gray-700 leading-relaxed">{currentScenario.situation}</p>
              </div>

              <div className="space-y-3">
                <p className="font-medium text-gray-900">How would you respond?</p>
                {currentScenario.options.map((option) => {
                  const isSelected = selectedOption === option.id;
                  const showCorrect = showFeedback && option.isCorrect;
                  const showIncorrect = showFeedback && isSelected && !option.isCorrect;

                  return (
                    <div key={option.id} className="space-y-2">
                      <button
                        onClick={() => !showFeedback && handleSelectOption(option.id)}
                        disabled={showFeedback}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          showCorrect ? 'border-green-500 bg-green-50' :
                          showIncorrect ? 'border-red-500 bg-red-50' :
                          isSelected ? 'border-indigo-500 bg-indigo-50' :
                          'border-gray-200 hover:border-gray-300 bg-white'
                        } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                      >
                        <div className="flex items-start gap-3">
                          {showFeedback && (
                            option.isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            ) : isSelected ? (
                              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            ) : null
                          )}
                          <p className={`flex-1 ${showCorrect || showIncorrect ? 'font-medium' : ''}`}>
                            {option.text}
                          </p>
                        </div>
                      </button>
                      {showFeedback && (showCorrect || showIncorrect) && (
                        <div className={`p-3 rounded-lg text-sm ${
                          option.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {option.feedback}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleRetry}
                  className="gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  {showFeedback ? 'Try Another Scenario' : 'Back'}
                </Button>
                {!showFeedback && (
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedOption}
                    className="gap-2 bg-indigo-600 hover:bg-indigo-700"
                  >
                    Submit Answer
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
