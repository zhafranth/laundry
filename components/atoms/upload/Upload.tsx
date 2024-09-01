import { useUpload } from "@/actions/hooks/user";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import { toast } from "react-toastify";

interface IUpload {
  name?: string;
  // label?: string;
  value?: string;
  onChange: (e: string | null) => void;
}

const Upload: React.FC<IUpload> = ({ name, value, onChange }) => {
  const { mutateUpload } = useUpload();
  const reference = useRef<HTMLInputElement>(null);

  const openFilePicker = useCallback(() => {
    if (reference?.current) {
      reference?.current?.click();
    }
  }, []);

  // const clearInputFile = () => {
  //   if (reference.current) {
  //     reference.current.value = "";
  //   }
  // };

  const handleImport = useCallback(
    async (event_: React.ChangeEvent<HTMLInputElement>) => {
      const file = event_.target.files && event_.target.files[0];
      if (file && file.size > 1 * 2000 * 1024) {
        toast.error("Max file size 2MB");
      } else {
        const data = new FormData();
        data.set("file", file as File);
        data.set("path", "profile" as string);

        mutateUpload(data, {
          onSuccess(data) {
            onChange(data?.data as unknown as string);
          },
        });
      }
    },
    [mutateUpload, onChange]
  );

  return (
    <div>
      <p className="text-slate-600 text-sm mb-2">Profile </p>
      <div className="hidden">
        <input
          type="file"
          accept={".png,.jpg,.jpeg"}
          ref={reference}
          onChange={handleImport}
          name={name}
        />
      </div>
      <div className="flex items-center gap-x-4 divide-dashed rounded-md border-dashed border [stroke-dasharray:2,5] border-slate-300 p-4">
        <div className="flex justify-center items-center w-14 h-14 rounded-md bg-blue-200 text-blue-500 overflow-hidden">
          {!value ? (
            <FaImage />
          ) : (
            <Image
              width={100}
              height={100}
              src={value}
              alt="profile"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <p className="text-sm text-slate-400">
          Upload a profile picture. Max size 1MB
        </p>
        <button
          onClick={openFilePicker}
          type="button"
          data-testid="import-button"
          className="ml-auto text-xs border !border-solid px-3 py-2 font-semibold border-slate-300 rounded-md"
        >
          Browse
        </button>
      </div>
    </div>
  );
};

export default Upload;
