import Modal from "@/components/atoms/modal";
import { styleInput } from "@/utils/style";
import { Input } from "@nextui-org/react";
import { useForm } from "@tanstack/react-form";
import React from "react";

const ModalKategori = ({ closeModal }: { closeModal: () => void }) => {
  const form = useForm({
    onSubmit: async ({ value }) => {
      console.log("vale:", value);
    },
  });
  return (
    <Modal title="Tambah Kategori" onClose={closeModal} isOpen>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="kategori">
          {(field) => {
            return (
              <Input
                name={field.name}
                value={field.state.value as string}
                label="Kategori"
                placeholder="Input label kategori"
                labelPlacement="outside"
                radius="sm"
                isInvalid={field.state.meta.errors.length > 0}
                errorMessage={field.state.meta.errors}
                onChange={(e) => field.handleChange(e.target.value)}
                classNames={styleInput}
              />
            );
          }}
        </form.Field>
      </form>
    </Modal>
  );
};

export default ModalKategori;
