import { useEffect } from 'react';
import { useBriefingStore } from '../store/useBriefingStore';
import { fetchApi } from '../lib/api';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import BriefingCard from '../components/BriefingCard';
import ActionItem from '../components/ActionItem';
import EmailThread from '../components/EmailThread';
import MeetingCard from '../components/MeetingCard';
import DocCard from '../components/DocCard';
import { format } from 'date-fns';

export default function BriefingView() {
  const { briefingData, setBriefingData, isLoading, setIsLoading } = useBriefingStore();

  useEffect(() => {
    let isMounted = true;
    const loadBriefing = async () => {
      if (briefingData) return;
      
      setIsLoading(true);
      try {
        const response = await fetchApi('/api/briefing/generate');
        if (isMounted) setBriefingData(response.data);
      } catch (error) {
        console.error('Failed to load briefing', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadBriefing();
    return () => { isMounted = false; };
  }, [briefingData, setBriefingData, setIsLoading]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!briefingData || !briefingData.ai) {
    return (
      <div className="p-8 text-center text-brief-gray-text mt-20">
        <p>No briefing data available.</p>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          className="mt-4 text-brief-blue hover:underline"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const { ai, raw } = briefingData;
  const today = format(new Date(), 'EEEE, d MMMM yyyy');

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-10 pb-20">
      <header className="border-b border-brief-gray-border pb-6">
        <h1 className="text-3xl font-bold text-brief-gray-heading mb-2">Today's Briefing</h1>
        <p className="text-brief-gray-text text-sm">{today}</p>
      </header>

      {/* AI Summary */}
      <section>
        <h2 className="text-[13px] font-semibold uppercase tracking-wider text-brief-gray-text mb-4">Executive Summary</h2>
        <BriefingCard summary={ai.summary} insights={ai.insights} />
      </section>

      {/* Action Items */}
      <section>
        <h2 className="text-[13px] font-semibold uppercase tracking-wider text-brief-gray-text mb-4">Action Items</h2>
        {ai.actionItems?.length > 0 ? (
          <div className="bg-white p-5 rounded-xl border border-brief-gray-border shadow-[0_1px_3px_rgba(0,0,0,0.06)] space-y-3">
            {ai.actionItems.map((item: any, idx: number) => (
              <ActionItem key={idx} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState type="docs" />
        )}
      </section>

      {/* Priority Emails */}
      <section>
        <h2 className="text-[13px] font-semibold uppercase tracking-wider text-brief-gray-text mb-4">Priority Emails</h2>
        {ai.priorityEmails?.length > 0 ? (
          <div className="space-y-3">
            {ai.priorityEmails.map((email: any, idx: number) => (
              <EmailThread key={idx} email={email} />
            ))}
          </div>
        ) : (
          <EmptyState type="emails" />
        )}
      </section>

      {/* Today's Meetings */}
      <section>
        <h2 className="text-[13px] font-semibold uppercase tracking-wider text-brief-gray-text mb-4">Today's Meetings</h2>
        {raw?.events?.length > 0 ? (
          <div className="space-y-3">
            {raw.events.map((event: any, idx: number) => (
              <MeetingCard key={idx} event={event} />
            ))}
          </div>
        ) : (
          <EmptyState type="meetings" />
        )}
      </section>
      
      {/* Active Documents */}
      <section>
        <h2 className="text-[13px] font-semibold uppercase tracking-wider text-brief-gray-text mb-4">Active Documents</h2>
        {raw?.files?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {raw.files.slice(0, 6).map((file: any, idx: number) => (
              <DocCard key={idx} file={file} />
            ))}
          </div>
        ) : (
          <EmptyState type="docs" />
        )}
      </section>
    </div>
  );
}
