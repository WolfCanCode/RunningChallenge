import { usePathname, useRouter } from "next/navigation";
import { menus, MenuType } from "./config";

export const BottomBar = () => {
  const pathName = usePathname();
  const router = useRouter();

  /**
   * If the pathName variable is not null, and if the pathName variable includes the path property of
   * the menu object, then return true, otherwise return false.
   * @param {MenuType} menu - MenuType - this is the menu object that we are iterating over.
   * @returns A boolean value.
   */
  const isActive = (menu: MenuType) => {
    return pathName?.includes(menu.path);
  };

  /**
   * The goTo function takes a string as an argument and uses the router.push method to navigate to the
   * path specified by the string.
   * @param {string} path - The path to navigate to.
   */
  const goTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="h-[86px]  w-full px-[40px] bg-lead shadow-md absolute bottom-0 left-0 flex flex-row justify-between">
      {menus.map((menu) => (
        <button
          key={menu.path}
          className={`h-[60px] w-[60px] text-4xl my-auto ${
            isActive(menu) ? "bg-coronation/20" : ""
          } rounded-xl transition-all ease-in-out duration-200`}
          onClick={() => goTo(menu.path)}
        >
          <span>{menu.title}</span>
        </button>
      ))}
    </div>
  );
};
