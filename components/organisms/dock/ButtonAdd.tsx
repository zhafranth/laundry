"use client";

import ModalService from "@/app/controller/service/components/ModalService";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { FaPlus } from "react-icons/fa";

const ButtonAdd = () => {
  const [showModal, setShowModal] = useState<"service" | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleCloseModal = useCallback(() => setShowModal(null), []);
  const handleShowModal = useCallback(
    (type: "service") => setShowModal(type),
    []
  );

  const handleAdd = useCallback(() => {
    if (pathname === "/controller/transaksi") router.push(`${pathname}/create`);
    if (pathname === "/controller/service") handleShowModal("service");
    if (pathname === "/controller/performance")
      router.push(`${pathname}/create-outcome`);
  }, [handleShowModal, pathname, router]);

  return (
    <>
      <Button
        isIconOnly
        radius="full"
        color="primary"
        onPress={handleAdd}
        size="md"
      >
        <FaPlus />
      </Button>
      {showModal === "service" && <ModalService toggle={handleCloseModal} />}
    </>
  );
};

export default ButtonAdd;
