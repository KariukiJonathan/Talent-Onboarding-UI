import { useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Plus, GripVertical, Edit, Trash2, Save, Video, BookOpen, CheckSquare, FileQuestion, Presentation, Users } from 'lucide-react';
import { mockCompanies, mockRoles, mockRoadmaps } from '../../mockData';
import { RoadmapStep } from '../../types';
import { toast } from 'sonner';

const stepIcons = {
  Video,
  Reading: BookOpen,
  Task: CheckSquare,
  Quiz: FileQuestion,
  Simulator: Presentation,
  Meeting: Users,
};

export default function RoadmapBuilderPage() {
  const { roleId } = useParams();
  const [selectedRoleId, setSelectedRoleId] = useState(roleId || '');
  const [roadmapTitle, setRoadmapTitle] = useState('');
  const [roadmapDescription, setRoadmapDescription] = useState('');
  const [steps, setSteps] = useState<RoadmapStep[]>([]);
  const [isStepDialogOpen, setIsStepDialogOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<RoadmapStep | null>(null);
  const [stepFormData, setStepFormData] = useState({
    title: '',
    description: '',
    type: 'Task' as RoadmapStep['type'],
    duration: 60,
    content: '',
    aiAssistantEnabled: true,
  });

  // Load existing roadmap if editing
  const loadRoadmap = (roleId: string) => {
    const existingRoadmap = mockRoadmaps.find(r => r.roleId === roleId);
    if (existingRoadmap) {
      setRoadmapTitle(existingRoadmap.title);
      setRoadmapDescription(existingRoadmap.description);
      setSteps(existingRoadmap.steps);
    } else {
      setRoadmapTitle('');
      setRoadmapDescription('');
      setSteps([]);
    }
  };

  const handleRoleChange = (roleId: string) => {
    setSelectedRoleId(roleId);
    loadRoadmap(roleId);
  };

  const handleAddStep = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStep) {
      setSteps(steps.map(s => 
        s.id === editingStep.id 
          ? { ...s, ...stepFormData }
          : s
      ));
      toast.success('Step updated successfully!');
    } else {
      const newStep: RoadmapStep = {
        id: `step-${Date.now()}`,
        ...stepFormData,
        order: steps.length + 1,
      };
      setSteps([...steps, newStep]);
      toast.success('Step added successfully!');
    }

    setIsStepDialogOpen(false);
    resetStepForm();
  };

  const handleEditStep = (step: RoadmapStep) => {
    setEditingStep(step);
    setStepFormData({
      title: step.title,
      description: step.description,
      type: step.type,
      duration: step.duration,
      content: step.content,
      aiAssistantEnabled: step.aiAssistantEnabled,
    });
    setIsStepDialogOpen(true);
  };

  const handleDeleteStep = (id: string) => {
    setSteps(steps.filter(s => s.id !== id));
    toast.success('Step deleted successfully!');
  };

  const resetStepForm = () => {
    setStepFormData({
      title: '',
      description: '',
      type: 'Task',
      duration: 60,
      content: '',
      aiAssistantEnabled: true,
    });
    setEditingStep(null);
  };

  const handleSaveRoadmap = () => {
    if (!selectedRoleId) {
      toast.error('Please select a role first');
      return;
    }
    if (!roadmapTitle) {
      toast.error('Please enter a roadmap title');
      return;
    }
    if (steps.length === 0) {
      toast.error('Please add at least one step');
      return;
    }
    toast.success('Roadmap saved successfully!');
  };

  const selectedRole = mockRoles.find(r => r.id === selectedRoleId);
  const selectedCompany = selectedRole ? mockCompanies.find(c => c.id === selectedRole.companyId) : null;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Roadmap Builder</h1>
        <p className="text-gray-600 mt-1">Create and manage onboarding roadmaps for roles</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Configuration */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Roadmap Configuration</CardTitle>
              <CardDescription>Select a role and configure the roadmap</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role *</Label>
                <Select value={selectedRoleId} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockRoles.map((role) => {
                      const company = mockCompanies.find(c => c.id === role.companyId);
                      return (
                        <SelectItem key={role.id} value={role.id}>
                          {role.title} - {company?.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {selectedRole && (
                <div className="p-3 bg-gray-50 rounded-lg space-y-1">
                  <p className="text-sm font-medium text-gray-900">{selectedRole.title}</p>
                  <p className="text-xs text-gray-600">{selectedCompany?.name}</p>
                  <p className="text-xs text-gray-500">{selectedRole.department}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Roadmap Title *</Label>
                <Input
                  id="title"
                  value={roadmapTitle}
                  onChange={(e) => setRoadmapTitle(e.target.value)}
                  placeholder="e.g., Frontend Developer Onboarding"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={roadmapDescription}
                  onChange={(e) => setRoadmapDescription(e.target.value)}
                  placeholder="Describe the onboarding journey..."
                  rows={3}
                />
              </div>

              <div className="pt-4">
                <Button onClick={handleSaveRoadmap} className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700">
                  <Save className="w-4 h-4" />
                  Save Roadmap
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Steps</span>
                <span className="font-semibold">{steps.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Est. Duration</span>
                <span className="font-semibold">
                  {Math.round(steps.reduce((sum, s) => sum + s.duration, 0) / 60)} hours
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">AI-Assisted Steps</span>
                <span className="font-semibold">
                  {steps.filter(s => s.aiAssistantEnabled).length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Steps */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Roadmap Steps</CardTitle>
                <CardDescription>Add and organize onboarding steps</CardDescription>
              </div>
              <Dialog open={isStepDialogOpen} onOpenChange={setIsStepDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="w-4 h-4" />
                    Add Step
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingStep ? 'Edit Step' : 'Add New Step'}</DialogTitle>
                    <DialogDescription>
                      {editingStep ? 'Update step information' : 'Create a new onboarding step'}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddStep} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="step-title">Step Title *</Label>
                      <Input
                        id="step-title"
                        value={stepFormData.title}
                        onChange={(e) => setStepFormData({ ...stepFormData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="step-description">Description *</Label>
                      <Input
                        id="step-description"
                        value={stepFormData.description}
                        onChange={(e) => setStepFormData({ ...stepFormData, description: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="step-type">Type *</Label>
                        <Select
                          value={stepFormData.type}
                          onValueChange={(value) => setStepFormData({ ...stepFormData, type: value as RoadmapStep['type'] })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Video">Video</SelectItem>
                            <SelectItem value="Reading">Reading</SelectItem>
                            <SelectItem value="Task">Task</SelectItem>
                            <SelectItem value="Quiz">Quiz</SelectItem>
                            <SelectItem value="Simulator">Simulator</SelectItem>
                            <SelectItem value="Meeting">Meeting</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="step-duration">Duration (minutes) *</Label>
                        <Input
                          id="step-duration"
                          type="number"
                          min="1"
                          value={stepFormData.duration}
                          onChange={(e) => setStepFormData({ ...stepFormData, duration: parseInt(e.target.value) })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="step-content">Content *</Label>
                      <Textarea
                        id="step-content"
                        value={stepFormData.content}
                        onChange={(e) => setStepFormData({ ...stepFormData, content: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="space-y-1">
                        <Label htmlFor="ai-assistant">AI Assistant</Label>
                        <p className="text-xs text-gray-500">Enable AI help for this step</p>
                      </div>
                      <Switch
                        id="ai-assistant"
                        checked={stepFormData.aiAssistantEnabled}
                        onCheckedChange={(checked) => setStepFormData({ ...stepFormData, aiAssistantEnabled: checked })}
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsStepDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                        {editingStep ? 'Update' : 'Add'} Step
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {steps.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No steps added yet. Click "Add Step" to get started.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {steps.map((step, index) => {
                    const Icon = stepIcons[step.type];
                    return (
                      <div
                        key={step.id}
                        className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors"
                      >
                        <div className="cursor-move">
                          <GripVertical className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-500">Step {index + 1}</span>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                              {step.type}
                            </span>
                            {step.aiAssistantEnabled && (
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
                                AI Assisted
                              </span>
                            )}
                          </div>
                          <p className="font-medium text-gray-900">{step.title}</p>
                          <p className="text-sm text-gray-600">{step.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{step.duration} minutes</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditStep(step)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteStep(step.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
