export default function OnlineBadgeComp({
  isOnline,
  isShow,
  withText = true,
}: {
  isOnline: boolean;
  isShow?: boolean;
  withText?: boolean;
}) {
  return isShow ? (
    <div className="mt-1 flex items-center">
      <span
        className={`inline-block size-3 rounded-full ${
          isOnline ? "bg-green-600" : "bg-gray-500"
        }`}
      ></span>
      {withText && isOnline ? (
        <span className="ml-1 text-xs">Online</span>
      ) : withText && !isOnline ? (
        <span className="ml-1 text-xs">Offline</span>
      ) : null}
    </div>
  ) : (
    <></>
  );
}
