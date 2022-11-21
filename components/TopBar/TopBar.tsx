export const TopBar = () => {
  return (
    <div className="w-fit h-[60px] flex flex-row gap-[10px]">
      <div className="h-full w-[60px] bg-lead text-2xl rounded-full flex flex-col justify-center text-center">
        💪
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-xl text-lead font-medium">
          Hey champion, training?
        </span>
      </div>
    </div>
  );
};
