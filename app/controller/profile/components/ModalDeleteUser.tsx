"use client";

import { useUser } from "@/actions/hooks/user";
import Modal from "@/components/atoms/modal";
import { User } from "@prisma/client";
import React, { useCallback } from "react";

const ModalDeleteUser = ({
  data,
  closeModal,
}: {
  data: User;
  closeModal: () => void;
}) => {
  const { mutateDeleteUser } = useUser();
  const { id, name } = data ?? {};

  const handleDelete = useCallback(
    () => mutateDeleteUser(id, { onSuccess: closeModal }),
    [id, mutateDeleteUser, closeModal]
  );
  return (
    <Modal
      isOpen
      title="Hapus User"
      onClose={closeModal}
      onSubmit={handleDelete}
    >
      <p>
        Apakah anda yakin akan menghapus{" "}
        <span className="font-semibold">{name}</span>
      </p>
    </Modal>
  );
};

export default ModalDeleteUser;
