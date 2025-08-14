import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";

export default function LoadingPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="glass-box flex h-72 w-96 flex-col items-center justify-center rounded-4xl">
        <ChatBubbleOvalLeftEllipsisIcon className="size-16 animate-bounce" />
        <p>
          <span className="mx-0.5">Loading</span>
          <span className="bg-foreground mx-0.5 inline-block size-2 animate-pulse rounded" />
          <span className="bg-foreground mx-0.5 inline-block size-2 animate-pulse rounded" />
          <span className="bg-foreground mx-0.5 inline-block size-2 animate-pulse rounded" />
        </p>
      </div>
    </div>
  );
}
