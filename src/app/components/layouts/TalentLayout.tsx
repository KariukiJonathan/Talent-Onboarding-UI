import { Outlet, Link, useLocation } from 'react-router';
import { LayoutDashboard, Map, Presentation, BarChart3, LogOut } from 'lucide-react';
import { Button } from '../ui/button';

export default function TalentLayout() {
  const location = useLocation();

  const navItems = [
    { path: '/talent', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/talent/roadmap', label: 'My Roadmap', icon: Map },
    { path: '/talent/simulator', label: 'Workplace Simulator', icon: Presentation },
    { path: '/talent/progress', label: 'My Progress', icon: BarChart3 },
  ];

  const isActive = (path: string) => {
    if (path === '/talent') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Tana
          </h1>
          <p className="text-sm text-gray-600 mt-1">Talent Portal</p>
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
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600'
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
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Logged in as</p>
            <p className="text-sm font-medium">Sarah Kimani</p>
            <p className="text-xs text-gray-500">Frontend Developer</p>
          </div>
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
