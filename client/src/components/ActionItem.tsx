import { Check, Mail, Calendar } from 'lucide-react';

interface ActionItemProps {
  item: {
    text: string;
    source?: string;
    sourceId?: string;
  };
}

export default function ActionItem({ item }: ActionItemProps) {
  return (
    <div className="flex items-start gap-3 group">
      <button className="mt-1 w-4 h-4 rounded border border-gray-300 flex items-center justify-center text-transparent hover:border-brief-blue hover:text-brief-blue transition-colors shrink-0">
        <Check size={12} strokeWidth={3} />
      </button>
      <div className="flex-1">
        <p className="text-[15px] text-brief-gray-heading leading-[1.6]">{item.text}</p>
        {item.source && (
          <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1 mt-1">
            {item.source === 'email' ? <Mail size={10} /> : <Calendar size={10} />}
            {item.source}
          </span>
        )}
      </div>
    </div>
  );
}
