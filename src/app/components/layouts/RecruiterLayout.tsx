import { Outlet, Link, useLocation } from 'react-router';
import { Building2, Users, Briefcase, Map, BarChart3, LogOut } from 'lucide-react';
import { Button } from '../ui/button';

export default function RecruiterLayout() {
  const location = useLocation();

  const navItems = [
    { path: '/recruiter', label: 'Dashboard', icon: BarChart3 },
    { path: '/recruiter/companies', label: 'Companies', icon: Building2 },
    { path: '/recruiter/roles', label: 'Roles', icon: Briefcase },
    { path: '/recruiter/talent', label: 'Talent', icon: Users },
    { path: '/recruiter/roadmap-builder', label: 'Roadmap Builder', icon: Map },
    { path: '/recruiter/progress', label: 'Progress', icon: BarChart3 },
  ];

  const isActive = (path: string) => {
    if (path === '/recruiter') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-indigo-600">Tana</h1>
          <p className="text-sm text-gray-600 mt-1">Recruiter Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
