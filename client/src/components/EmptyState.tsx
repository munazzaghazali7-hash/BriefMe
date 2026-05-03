import { Inbox, CalendarX, FileX } from 'lucide-react';

export default function EmptyState({ type }: { type: 'emails' | 'meetings' | 'docs' }) {
  const config = {
    emails: { icon: Inbox, title: "No new emails", desc: "You're all caught up on your inbox." },
    meetings: { icon: CalendarX, title: "No meetings today", desc: "Your schedule is completely clear." },
    docs: { icon: FileX, title: "No recent docs", desc: "No active files from the last 48 hours." }
  };
  
  const { icon: Icon, title, desc } = config[type];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl border border-brief-gray-border border-dashed">
      <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-3">
        <Icon size={24} />
      </div>
      <h4 className="text-[15px] font-medium text-brief-gray-heading mb-1">{title}</h4>
      <p className="text-[13px] text-brief-gray-text text-center">{desc}</p>
    </div>
  );
}
