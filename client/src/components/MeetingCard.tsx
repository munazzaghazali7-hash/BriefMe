import { format } from 'date-fns';

interface MeetingCardProps {
  event: {
    title: string;
    startTime: string;
    attendees?: { name?: string; email: string }[];
    linkedDocs?: { webViewLink: string; iconLink: string; name: string }[];
  };
}

export default function MeetingCard({ event }: MeetingCardProps) {
  const startDate = new Date(event.startTime);
  const isAllDay = !event.startTime.includes('T');
  const timeStr = isAllDay ? 'All Day' : format(startDate, 'h:mm a');

  return (
    <div className="bg-white p-4 rounded-xl border border-brief-gray-border shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="flex items-start gap-4 mb-3">
        <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-[13px] font-medium shrink-0 whitespace-nowrap mt-0.5">
          {timeStr}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-[16px] text-brief-gray-heading">{event.title}</h3>
          {event.attendees && event.attendees.length > 0 && (
            <div className="flex items-center gap-1 mt-2">
              {event.attendees.slice(0, 4).map((att: any, i: number) => (
                <div key={i} className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold border border-white" title={att.email}>
                  {att.name ? att.name.charAt(0).toUpperCase() : att.email.charAt(0).toUpperCase()}
                </div>
              ))}
              {event.attendees.length > 4 && (
                <span className="text-[11px] text-gray-500 ml-1">+{event.attendees.length - 4} more</span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {event.linkedDocs && event.linkedDocs.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 pl-1">
          <p className="text-[11px] font-medium text-gray-400 uppercase mb-2">Relevant Docs</p>
          <div className="flex flex-wrap gap-2">
            {event.linkedDocs.map((doc: any, i: number) => (
              <a 
                key={i} 
                href={doc.webViewLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 px-2.5 py-1.5 rounded transition-colors"
              >
                <img src={doc.iconLink} alt="" className="w-4 h-4" />
                <span className="text-[12px] text-gray-700 truncate max-w-[150px]">{doc.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
