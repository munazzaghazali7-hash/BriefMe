import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Mail, Calendar, FileText, Loader2 } from 'lucide-react';
import { useBriefingStore } from '../store/useBriefingStore';

export default function Dashboard() {
  const { user, isLoading, setIsLoading } = useBriefingStore();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation for a second before routing
    setTimeout(() => {
      navigate('/briefing');
    }, 500);
  };

  const today = format(new Date(), 'EEEE, d MMMM yyyy');

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-[28px] font-semibold text-brief-gray-heading mb-1">
          {getGreeting()}, {user?.name?.split(' ')[0] || 'User'}
        </h1>
        <p className="text-sm text-brief-gray-text">{today}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-5 rounded-xl border border-brief-gray-border shadow-[0_1px_3px_rgba(0,0,0,0.06)] border-l-4 border-l-blue-500">
          <div className="flex items-center gap-3 text-brief-gray-text mb-2">
            <Mail size={18} />
            <h3 className="font-medium text-sm">Emails Today</h3>
          </div>
          <p className="text-2xl font-semibold text-brief-gray-heading">Unread Inbox</p>
        </div>
        
        <div className="bg-white p-5 rounded-xl border border-brief-gray-border shadow-[0_1px_3px_rgba(0,0,0,0.06)] border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-3 text-brief-gray-text mb-2">
            <Calendar size={18} />
            <h3 className="font-medium text-sm">Meetings Today</h3>
          </div>
          <p className="text-2xl font-semibold text-brief-gray-heading">Daily Schedule</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-brief-gray-border shadow-[0_1px_3px_rgba(0,0,0,0.06)] border-l-4 border-l-amber-500">
          <div className="flex items-center gap-3 text-brief-gray-text mb-2">
            <FileText size={18} />
            <h3 className="font-medium text-sm">Recent Docs</h3>
          </div>
          <p className="text-2xl font-semibold text-brief-gray-heading">Active Files</p>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full md:max-w-[320px] h-12 bg-brief-blue hover:bg-brief-blue-hover disabled:bg-brief-blue/70 text-white rounded-[10px] font-medium text-[15px] transition-colors flex items-center justify-center gap-2"
      >
        {isGenerating ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Generating Briefing...
          </>
        ) : (
          "Generate Today's Briefing"
        )}
      </button>
    </div>
  );
}
