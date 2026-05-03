import { format } from 'date-fns';

interface DocCardProps {
  file: {
    name: string;
    webViewLink: string;
    iconLink: string;
    modifiedTime: string;
  };
}

export default function DocCard({ file }: DocCardProps) {
  return (
    <a 
      href={file.webViewLink} 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-white p-3 rounded-xl border border-brief-gray-border shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-center gap-3 hover:border-brief-blue transition-colors group"
    >
      <img src={file.iconLink} alt="" className="w-8 h-8 object-contain" />
      <div className="min-w-0 flex-1">
        <h4 className="text-[14px] font-medium text-brief-gray-heading truncate group-hover:text-brief-blue transition-colors">{file.name}</h4>
        <p className="text-[12px] text-brief-gray-text truncate">Modified {format(new Date(file.modifiedTime), 'MMM d, h:mm a')}</p>
      </div>
    </a>
  );
}
