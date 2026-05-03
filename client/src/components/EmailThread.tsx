import { ExternalLink } from 'lucide-react';

interface EmailThreadProps {
  email: {
    threadId: string;
    sender: string;
    subject: string;
    summary: string;
    urgency: string;
  };
}

export default function EmailThread({ email }: EmailThreadProps) {
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500'];
  const charCode = email.sender.charCodeAt(0) || 0;
  const colorClass = colors[charCode % colors.length];

  return (
    <div className="bg-white p-4 rounded-xl border border-brief-gray-border shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col md:flex-row gap-4 items-start md:items-center">
      <div className={`w-10 h-10 rounded-full ${colorClass} text-white flex items-center justify-center font-semibold shrink-0`}>
        {email.sender.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-[15px] text-brief-gray-heading truncate">{email.sender}</span>
          {email.urgency === 'high' && (
            <span className="bg-red-50 text-red-600 text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wide">High</span>
          )}
        </div>
        <h4 className="text-[14px] text-brief-gray-heading truncate mb-1">{email.subject}</h4>
        <p className="text-[13px] text-brief-gray-text italic truncate">{email.summary}</p>
      </div>
      <a 
        href={`https://mail.google.com/mail/u/0/#inbox/${email.threadId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[13px] font-medium text-brief-blue hover:text-brief-blue-hover flex items-center gap-1 shrink-0 mt-2 md:mt-0"
      >
        Open <ExternalLink size={14} />
      </a>
    </div>
  );
}
