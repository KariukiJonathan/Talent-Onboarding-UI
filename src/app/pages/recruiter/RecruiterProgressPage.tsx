import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Progress } from '../../components/ui/progress';
import { mockTalent, mockCompanies, mockRoles, mockRoadmaps } from '../../mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Users, Clock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function RecruiterProgressPage() {
  const [selectedCompany, setSelectedCompany] = useState('all');

  const filteredTalent = selectedCompany === 'all' 
    ? mockTalent 
    : mockTalent.filter(t => t.companyId === selectedCompany);

  const avgProgress = Math.round(
    filteredTalent.reduce((sum, t) => sum + t.progress, 0) / filteredTalent.length
  );

  const statusData = [
    { name: 'Active', value: filteredTalent.filter(t => t.status === 'Active').length, color: '#22c55e' },
    { name: 'Pending', value: filteredTalent.filter(t => t.status === 'Pending').length, color: '#eab308' },
    { name: 'Completed', value: filteredTalent.filter(t => t.status === 'Completed').length, color: '#3b82f6' },
  ];

  const progressData = filteredTalent.map(t => {
    const role = mockRoles.find(r => r.id === t.roleId);
    return {
      name: t.name,
      progress: t.progress,
      role: role?.title || 'Unknown',
    };
  });

  const completedTalent = filteredTalent.filter(t => t.status === 'Completed').length;
  const totalSteps = mockRoadmaps.reduce((sum, r) => sum + r.steps.length, 0);
  const avgDuration = Math.round(
    mockRoadmaps.reduce((sum, r) => sum + r.estimatedDuration, 0) / mockRoadmaps.length
  );

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Progress Dashboard</h1>
          <p className="text-gray-600 mt-1">Track talent onboarding progress and metrics</p>
        </div>
        <div className="w-64">
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {mockCompanies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Talent
            </CardTitle>
            <Users className="w-4 h-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{filteredTalent.length}</div>
            <p className="text-xs text-gray-500 mt-1">Being onboarded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg. Progress
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{avgProgress}%</div>
            <Progress value={avgProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Completed
            </CardTitle>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{completedTalent}</div>
            <p className="text-xs text-gray-500 mt-1">Finished onboarding</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg. Duration
            </CardTitle>
            <Clock className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{avgDuration}</div>
            <p className="text-xs text-gray-500 mt-1">Days to complete</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Progress by Talent */}
        <Card>
          <CardHeader>
            <CardTitle>Progress by Talent</CardTitle>
            <CardDescription>Individual progress percentages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="progress" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Talent by onboarding status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Progress Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Progress</CardTitle>
          <CardDescription>Progress breakdown for each talent member</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTalent.map((talent) => {
              const company = mockCompanies.find(c => c.id === talent.companyId);
              const role = mockRoles.find(r => r.id === talent.roleId);
              const roadmap = mockRoadmaps.find(r => r.roleId === talent.roleId);
              const completedSteps = roadmap ? Math.round((talent.progress / 100) * roadmap.steps.length) : 0;
              const totalStepsForTalent = roadmap?.steps.length || 0;

              return (
                <div key={talent.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {talent.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{talent.name}</p>
                        <p className="text-sm text-gray-600">{role?.title} at {company?.name}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      talent.status === 'Active' ? 'bg-green-100 text-green-700' :
                      talent.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {talent.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={talent.progress} className="flex-1" />
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">{talent.progress}%</p>
                      <p className="text-xs text-gray-500">{completedSteps}/{totalStepsForTalent} steps</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
