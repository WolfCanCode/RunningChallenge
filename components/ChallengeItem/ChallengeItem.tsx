import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";

dayjs.extend(customParseFormat);
dayjs.extend(duration);

interface ChallengeItemProps {
  title: string;
  description: string;
  logo: string;
  items: { label: string; value: string | number; isSmall?: boolean }[];
  buttonLabel?: string;
  onClick?: () => void;
  status?: "PENDING" | "SUCCESS" | "FAILED";
  isTime?: boolean;
}
export const ChallengeItem = (
  { logo, title, description, items, buttonLabel, onClick, status, isTime }:
    ChallengeItemProps,
) => {
  const [time, setTime] = useState("...");

  const getPerfectTime = (expiresDate: string) => {
    const diff = dayjs(expiresDate).diff(new Date());
    if (diff < 0) {
      return setTime(dayjs(expiresDate).format("YYYY/MM/DD"));
    }

    return setTime(dayjs.duration(diff).format("HH:mm:ss"));
  };

  useEffect(() => {
    if (isTime) {
      const interval = setInterval(
        () => getPerfectTime(items[1].value as string),
        1000,
      );

      return () => clearInterval(interval);
    }
  }, []);

  const renderValueBoard = () => {
    {
      // Guard
      if (!items || !items.length || items.length !== 2) return null;
      return (
        <div className="flex flex-col justify-between">
          <div className="flex flex-row justify-end">
            <div className="flex flex-row h-[40px] gap-[8px]">
              <div className="rounded-full bg-brick h-[40px] w-fit min-w-[40px] 
              text-coronation text-center text-2xl font-bold leading-[40px]">
                {items[0].value}
              </div>
              <div className="h-[40px] w-fit text-3xl flex flex-col justify-center">
                {items[0].label}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <div className="flex flex-row h-[40px] gap-[8px]">
              <div
                className={`rounded-full bg-deep-purple h-[40px] w-fit min-w-[40px] 
              text-coronation text-center ${
                  items[1].isSmall ? "text-sm" : "text-2xl"
                } font-bold leading-[40px] px-[20px]`}
              >
                {isTime ? time : items[1].value}
              </div>
              <div className="h-[40px] w-fit text-3xl flex flex-col justify-center">
                {items[1].label}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  const valueBoard = useMemo(() => renderValueBoard(), [items, time]);

  return (
    <div className="h-fit w-full flex flex-col gap-[10px]">
      <div
        className={`flex flex-row justify-between rounded-2xl ${
          status
            ? (status === "SUCCESS")
              ? "bg-tree-green"
              : (status === "FAILED")
              ? "bg-falu-red"
              : "bg-lead"
            : "bg-lead"
        } h-[130px] p-[15px]`}
      >
        <div className="h-[100px] w-[100px]">
          <img
            src={logo}
            height={100}
            width={100}
          />
        </div>
        {valueBoard}
      </div>
      <div className="px-[5px] flex flex-row justify-between gap-[40px]">
        <div className="flex flex-col gap-[5px]">
          <p className="text-md font-bold text-lead">
            {title}
          </p>
          <p className="text-sm text-lead leading-[14px]">
            {description}
          </p>
        </div>
        {buttonLabel
          ? (
            <div className="flex flex-col justify-center gap-[5px]">
              <button
                className={`h-[60px] w-[60px] ${
                  status
                    ? (status === "SUCCESS")
                      ? "bg-tree-green"
                      : (status === "FAILED")
                      ? "bg-falu-red"
                      : "bg-lead"
                    : "bg-lead"
                } text-coronation text-lg rounded-full font-bold active:scale-90`}
                onClick={onClick}
              >
                {buttonLabel}
              </button>
            </div>
          )
          : null}
      </div>
    </div>
  );
};
