interface BriefingCardProps {
  summary: string;
  insights?: string;
}

export default function BriefingCard({ summary, insights }: BriefingCardProps) {
  return (
    <div className="bg-white p-5 rounded-xl border border-brief-gray-border shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <p className="text-brief-gray-heading leading-relaxed text-[15px]">{summary}</p>
      {insights && (
        <div className="mt-4 pt-4 border-t border-brief-gray-border flex items-start gap-2">
          <span className="text-brief-blue font-bold">Insight:</span>
          <p className="text-[14px] text-brief-gray-text italic">{insights}</p>
        </div>
      )}
    </div>
  );
}
