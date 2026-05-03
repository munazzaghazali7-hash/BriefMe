import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings } from 'lucide-react';
import { useBriefingStore } from '../store/useBriefingStore';

export default function Sidebar() {
  const { user } = useBriefingStore();

  return (
    <div className="fixed bottom-0 w-full md:relative md:w-[240px] bg-white border-t md:border-t-0 md:border-r border-brief-gray-border flex md:flex-col h-[60px] md:h-full z-10">
      <div className="hidden md:flex p-6 items-center gap-3">
        <div className="w-8 h-8 bg-brief-blue rounded text-white flex items-center justify-center font-bold">
          B
        </div>
        <span className="font-bold text-xl text-brief-gray-heading">BriefMe</span>
      </div>

      <nav className="flex-1 flex md:flex-col px-2 md:px-4 space-x-2 md:space-x-0 md:space-y-1 justify-around md:justify-start py-2 md:py-0">
        <NavLink 
          to="/dashboard"
          className={({ isActive }) => 
            `flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 py-1 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
              isActive 
                ? 'bg-brief-blue-50 text-brief-blue' 
                : 'text-brief-gray-text hover:bg-gray-50'
            }`
          }
        >
          <LayoutDashboard size={18} />
          <span className="md:inline">Dashboard</span>
        </NavLink>
        <NavLink 
          to="/briefing"
          className={({ isActive }) => 
            `flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 py-1 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
              isActive 
                ? 'bg-brief-blue-50 text-brief-blue' 
                : 'text-brief-gray-text hover:bg-gray-50'
            }`
          }
        >
          <FileText size={18} />
          <span className="md:inline">Briefing</span>
        </NavLink>
        <NavLink 
          to="/settings"
          className={({ isActive }) => 
            `flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 py-1 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
              isActive 
                ? 'bg-brief-blue-50 text-brief-blue' 
                : 'text-brief-gray-text hover:bg-gray-50'
            }`
          }
        >
          <Settings size={18} />
          <span className="md:inline">Settings</span>
        </NavLink>
      </nav>

      {user && (
        <div className="hidden md:block p-4 border-t border-brief-gray-border mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {user.picture ? (
                <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-medium text-gray-600">
                  {user.name.charAt(0)}
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-brief-gray-heading truncate">
              {user.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
