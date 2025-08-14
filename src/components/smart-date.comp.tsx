import { useMemo } from "react";

type SmartDateProps = {
  datetime: Date | string;
};

export default function SmartDateComp({ datetime }: SmartDateProps) {
  const display = useMemo(() => {
    const inputDate =
      typeof datetime === "string" ? new Date(datetime) : datetime;
    const now = new Date();

    const diffMs = now.getTime() - inputDate.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    const isSameDay = now.toDateString() === inputDate.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = yesterday.toDateString() === inputDate.toDateString();

    if (isSameDay) {
      return inputDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (isYesterday) {
      return "yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else {
      const years = now.getFullYear() - inputDate.getFullYear();
      const months = now.getMonth() - inputDate.getMonth() + years * 12;
      if (months < 12) {
        return `${months} month${months > 1 ? "s" : ""} ago`;
      } else {
        return `${years} year${years > 1 ? "s" : ""} ago`;
      }
    }
  }, [datetime]);

  return <span>{display}</span>;
}
