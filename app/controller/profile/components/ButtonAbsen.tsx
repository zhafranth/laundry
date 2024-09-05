"use client";

import { useAbsen } from "@/actions/hooks/absensi";
import { ColorType } from "@/components/atoms/chips/Chips";
import { Button } from "@nextui-org/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const ButtonAbsen = ({
  type,
  id,
}: {
  type: "masuk" | "keluar";
  id: string;
}) => {
  const { mutate, isPending } = useAbsen();
  const handleAbsen = useCallback(() => {
    mutate({
      type,
      userId: id,
    });
  }, [id, mutate, type]);

  const { color, icon, label } = useMemo(() => {
    const varian = {
      masuk: {
        icon: <FaArrowRight />,
        label: "Masuk",
        color: "primary",
      },
      keluar: {
        icon: <FaArrowLeft />,
        label: "Keluar",
        color: "danger",
      },
    };
    return varian[type];
  }, [type]);

  const [location, setLocation] = useState<{
    latitude: null | number;
    longitude: null | number;
  }>({ latitude: null, longitude: null });
  const [isWithinLocation, setIsWithinLocation] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });

          // Replace with your target location coordinates
          const targetLatitude = -6.15258; // Koordinat latitude untuk Apartemen Gading Nias
          const targetLongitude = 106.913047;

          // Check if the user is within a certain distance to the target location
          const distance = calculateDistance(
            latitude,
            longitude,
            targetLatitude,
            targetLongitude
          );

          const thresholdDistance = 0.8; // Threshold distance in km, bisa diubah sesuai kebutuhan
          setIsWithinLocation(distance <= thresholdDistance);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      toast.error("Geolocation not available in this browser.");
    }
  }, []);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const toRadians = (degree: number) => degree * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  return (
    <Button
      onClick={() => handleAbsen()}
      color={color as ColorType}
      radius="full"
      endContent={icon}
      isDisabled={!isWithinLocation}
      isLoading={isPending}
    >
      Absen {label}
    </Button>
  );
};

export default ButtonAbsen;
