"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
      <div className="max-w-md">
        <h1 className="text-white text-3xl font-bold mb-3">
          Something went wrong
        </h1>
        <p className="text-grey1 text-sm mb-6">
          We could not load this game right now. Please try again in a few seconds.
        </p>
        <button
          onClick={() => reset()}
          className="px-5 py-2 bg-blue1 text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
