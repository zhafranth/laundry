import { useKategoriPengeluaran } from "@/actions/hooks/pengeluaran";
import Modal from "@/components/atoms/modal";
import { styleInput } from "@/utils/style";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "@tanstack/react-form";
import React from "react";

const ModalKategori = ({ closeModal }: { closeModal: () => void }) => {
  const { mutateCreateKategoriPengeluaran } = useKategoriPengeluaran();

  const form = useForm({
    onSubmit: async ({ value }) => {
      mutateCreateKategoriPengeluaran(value as { nama: string }, {
        onSuccess: closeModal,
      });
    },
  });

  return (
    <Modal title="Tambah Kategori" onClose={closeModal} isOpen removeAction>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="nama"
          validators={{
            onChange: ({ value }) =>
              !value ? "This field is required" : undefined,
          }}
        >
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
        <div className="flex justify-end gap-x-2 my-4">
          <Button color="danger" variant="bordered" onClick={closeModal}>
            Batal
          </Button>
          <Button type="submit" color="primary">
            Simpan
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalKategori;
