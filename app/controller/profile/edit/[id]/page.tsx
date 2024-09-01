"use client";

import { useGetUser } from "@/actions/hooks/user";
import { useParams } from "next/navigation";
import React from "react";
import FormUser from "../../components/FormUser";
import { Spinner } from "@nextui-org/react";

const EditProfile = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUser(id as string);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] w-full flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return <FormUser data={data} />;
};

export default EditProfile;
