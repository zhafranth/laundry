"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

const BackButton = ({ title }: { title?: string }) => {
  const router = useRouter();

  const handleBack = useCallback(() => router.back(), [router]);
  return (
    <div className="flex items-center gap-x-8">
      <Button
        isIconOnly
        radius="full"
        variant="flat"
        color="primary"
        onPress={handleBack}
      >
        <FaArrowLeftLong />
      </Button>
      <p className="text-slate-500 font-semibold">{title}</p>
    </div>
  );
};

export default BackButton;
