"use client";

import { Button, Divider } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { MENUS } from "./Menu.enum";
import ButtonAdd from "./ButtonAdd";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { useFetchProfile } from "@/actions/hooks/user";

const Dock = () => {
  const { data } = useFetchProfile();

  const { role } = data ?? {};

  const pathname = usePathname();
  const availablePath = MENUS.filter((item) => item.key !== "divider").map(
    (item) => `/controller/${item.key}`
  );

  const router = useRouter();

  const handleLink = useCallback(
    (key: string) => router.push(`/controller/${key}`),
    [router]
  );

  if (!availablePath.includes(pathname)) {
    return null;
  }

  return (
    <div className="fixed bottom-6 w-[100vw] sm:w-[96vw] md:w-[900px]">
      <div className="flex items-center w-11/12 sm:w-10/12 md:w-7/12 sm:mx-auto justify-center gap-x-0 sm:gap-x-2 border-[1px] bg-slate-50 border-slate-300 rounded-3xl px-4 py-2">
        <ButtonAdd />
        {MENUS?.map(({ key, icon, onlyAdmin }, index) => {
          if (key === "divider") {
            return (
              <Divider
                orientation="vertical"
                className="h-10"
                key={`${key}-${index}`}
              />
            );
          }
          return (
            <Button
              isIconOnly
              radius="full"
              variant="light"
              key={`${key}-${index}`}
              onPress={() => handleLink(key)}
              className={`!size-8 sm:!size-12 text-xs sm:text-medium ${
                pathname === `/controller/${key}`
                  ? "text-blue-600"
                  : "text-slate-600"
              }`}
              isDisabled={role === "USER" && onlyAdmin}
            >
              {icon}
            </Button>
          );
        })}

        <Button
          isIconOnly
          radius="full"
          variant="light"
          className="!size-8 sm:!size-12 text-xs sm:text-medium"
          onClick={() => signOut()}
        >
          <FiLogOut />
        </Button>
      </div>
    </div>
  );
};

export default Dock;
