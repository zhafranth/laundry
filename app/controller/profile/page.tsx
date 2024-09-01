"use client";

import { useFetchProfile } from "@/actions/hooks/user";
import { Avatar, Divider, Spinner } from "@nextui-org/react";
import React, { useCallback, useMemo } from "react";
import SectionUser from "./components/SectionUser";
import SectionAdmin from "./components/SectionAdmin";

const Profile = () => {
  const { data, isFetching } = useFetchProfile();
  const { name, role, profile_url, id } = data ?? {};

  const profile = useMemo(() => {
    const { kontak, alamat, identitas, status_pegawai } = data ?? {};
    return [
      {
        label: "Kontak",
        value: kontak || "-",
      },
      {
        label: "Alamat",
        value: alamat || "-",
      },
      {
        label: "Identitas",
        value: identitas || "-",
      },
      {
        label: "Status",
        value: status_pegawai || "-",
      },
    ];
  }, [data]);

  const renderSection = useCallback(() => {
    if (role === "ADMIN") {
      return <SectionAdmin />;
    }
    return <SectionUser id={id as string} />;
  }, [id, role]);

  return (
    <div className="mb-24">
      <div className="border bg-[#f7fcff] border-blue-200 rounded-lg p-6">
        <div className="flex gap-x-4 items-center">
          <Avatar
            color="primary"
            classNames={{
              base: "w-20 h-20",
            }}
            showFallback
            src={profile_url || ""}
          />
          <div className="">
            <h4 className="font-semibold text-lg">{name}</h4>
            <p className="text-sm text-neutral-500">
              {role === "USER" ? "Pegawai" : "Yang punya yang punya"}
            </p>
          </div>
        </div>
        <Divider className="my-4 bg-blue-200" />
        <div className="flex justify-between">
          {profile?.map(({ label, value }, index) => (
            <div key={index}>
              <p className="text-sm text-slate-400">{label}</p>
              <h4>{value}</h4>
            </div>
          ))}
        </div>
      </div>

      {isFetching && (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      )}
      {!isFetching && data && role && renderSection()}
    </div>
  );
};

export default Profile;
