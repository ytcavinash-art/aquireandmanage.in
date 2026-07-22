interface NewsErrorProps {
  message: string;
  onRetry: () => void;
}

export default function NewsError({ message, onRetry }: NewsErrorProps) {
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
      <h2 className="text-xl text-navy">News is temporarily unavailable</h2>
      <p className="mt-2 text-slate-600">{message}</p>
      <button type="button" onClick={onRetry} className="mt-5 rounded-md bg-navy px-5 py-2.5 font-semibold text-white hover:bg-navy-light">
        Try again
      </button>
    </div>
  );
}
