import { usePathname } from "next/navigation";
import { menus, MenuType } from "./config";

export const BottomBar = () => {
  const pathName = usePathname();
  const isActive = (menu: MenuType) => {
    return pathName?.includes(menu.path);
  };
  return (
    <div className="h-[86px]  w-full px-[40px] bg-lead shadow-md absolute bottom-0 left-0 flex flex-row justify-between">
      {menus.map((menu) => (
        <button
          className={`h-[60px] w-[60px] text-4xl my-auto ${
            isActive(menu) ? "bg-coronation/20" : ""
          } rounded-xl`}
        >
          <span>{menu.title}</span>
        </button>
      ))}
    </div>
  );
};
