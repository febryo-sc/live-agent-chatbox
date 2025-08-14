"use client";

export default function BadgeComp({
  content,
  variant,
}: {
  content: string;
  variant: string;
}) {
  let variantClass;
  switch (variant) {
    case "warning":
      variantClass = "bg-yellow-500 dark:bg-yellow-600";
      break;
    case "primary":
      variantClass = "bg-blue-500 dark:bg-blue-600";
      break;
    case "danger":
      variantClass = "bg-red-500 dark:bg-red-600";
      break;
    default:
      variantClass = "bg-background text-foreground";
      break;
  }
  return (
    <span
      className={`flex size-4 items-center justify-center rounded-full text-xs ${variantClass}`}
    >
      {content}
    </span>
  );
}
