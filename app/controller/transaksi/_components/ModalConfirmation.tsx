import { TransactionPayload } from "@/actions/actions/transaction/Transaction.interface";
import Modal from "@/components/atoms/modal";
import React from "react";

const ModalConfirmation = ({
  toggle,
  data,
}: {
  toggle: () => void;
  data?: TransactionPayload;
}) => {
  return (
    <Modal title="Konfirmasi Transakasi" onSubmit={toggle} onClose={toggle}>
      ModalConfirmation
    </Modal>
  );
};

export default ModalConfirmation;
