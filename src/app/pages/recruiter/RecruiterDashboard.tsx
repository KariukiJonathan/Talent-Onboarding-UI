import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Building2, Users, Briefcase, TrendingUp } from 'lucide-react';
import { mockCompanies, mockRoles, mockTalent } from '../../mockData';
import { Progress } from '../../components/ui/progress';

export default function RecruiterDashboard() {
  const activetalent = mockTalent.filter(t => t.status === 'Active').length;
  const avgProgress = Math.round(
    mockTalent.reduce((sum, t) => sum + t.progress, 0) / mockTalent.length
  );

  const recentTalent = mockTalent.slice(0, 5);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your talent.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Companies
            </CardTitle>
            <Building2 className="w-4 h-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{mockCompanies.length}</div>
            <p className="text-xs text-gray-500 mt-1">Active partners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Roles
            </CardTitle>
            <Briefcase className="w-4 h-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{mockRoles.length}</div>
            <p className="text-xs text-gray-500 mt-1">Open positions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Talent
            </CardTitle>
            <Users className="w-4 h-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{activetalent}</div>
            <p className="text-xs text-gray-500 mt-1">Currently onboarding</p>
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
            <p className="text-xs text-gray-500 mt-1">Completion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Talent */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Talent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTalent.map((talent) => {
              const company = mockCompanies.find(c => c.id === talent.companyId);
              const role = mockRoles.find(r => r.id === talent.roleId);

              return (
                <div key={talent.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {talent.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{talent.name}</p>
                        <p className="text-sm text-gray-600">{role?.title} at {company?.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Progress</p>
                      <div className="flex items-center gap-2">
                        <Progress value={talent.progress} className="w-24" />
                        <span className="text-sm font-medium">{talent.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        talent.status === 'Active' ? 'bg-green-100 text-green-700' :
                        talent.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {talent.status}
                      </span>
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
