import useToggle from "@/utils/hooks/useToggle";
import { Button } from "@nextui-org/react";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalDeleteUser from "./ModalDeleteUser";

const CardUser = ({ data }: { data: User }) => {
  const { isOpen, toggle } = useToggle();
  const { name, role, profile_url, id } = data ?? {};
  return (
    <div className="rounded-xl bg-white px-5 py-4 border border-blue-50 flex items-center gap-4">
      <div className="w-14 h-14 rounded-full overflow-hidden capitalize flex justify-center items-center text-white bg-blue-600">
        {profile_url ? (
          <Image
            width={100}
            height={100}
            src={profile_url}
            alt="profile user"
            className="w-full h-full object-cover"
          />
        ) : (
          name?.charAt(0)
        )}
      </div>
      <div>
        <p className="capitalize">{name}</p>
        <p className="text-sm text-slate-400">
          {role === "ADMIN" ? "Yang Punya Usaha" : "Pegawai"}
        </p>
      </div>
      <div className="flex gap-x-2 ml-auto">
        <Button
          size="sm"
          radius="full"
          variant="flat"
          startContent={<FaTrash />}
          color="danger"
          onClick={toggle}
        >
          Hapus
        </Button>
        <Link href={`/controller/profile/edit/${id}`}>
          <Button
            size="sm"
            radius="full"
            variant="flat"
            startContent={<FaEdit />}
            color="warning"
          >
            Edit
          </Button>
        </Link>
      </div>
      {isOpen && <ModalDeleteUser data={data} closeModal={toggle} />}
    </div>
  );
};

export default CardUser;
