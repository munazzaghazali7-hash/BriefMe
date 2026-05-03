export default function LoadingState() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto w-full p-4 animate-pulse">
      {/* Summary Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-24 bg-brief-gray-border rounded"></div>
        <div className="bg-white p-5 rounded-xl border border-brief-gray-border shadow-sm space-y-3">
          <div className="h-4 bg-brief-gray-border rounded w-full"></div>
          <div className="h-4 bg-brief-gray-border rounded w-5/6"></div>
          <div className="h-4 bg-brief-gray-border rounded w-4/6"></div>
        </div>
      </div>

      {/* Priority Emails Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-32 bg-brief-gray-border rounded"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-brief-gray-border shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-brief-gray-border shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-brief-gray-border rounded w-1/4"></div>
                <div className="h-3 bg-brief-gray-border rounded w-12"></div>
              </div>
              <div className="h-4 bg-brief-gray-border rounded w-2/4"></div>
              <div className="h-3 bg-brief-gray-border rounded w-3/4 mt-2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Meetings Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-32 bg-brief-gray-border rounded"></div>
        {[1, 2].map((i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-brief-gray-border shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-6 rounded-full bg-brief-gray-border"></div>
              <div className="h-5 bg-brief-gray-border rounded w-1/3"></div>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map(j => <div key={j} className="w-6 h-6 rounded-full bg-brief-gray-border"></div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
