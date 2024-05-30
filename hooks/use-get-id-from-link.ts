"use client";
import { useSearchParams } from "next/navigation";

const useGetIdFromLink = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");

  if (id) {
    const parseId = parseInt(id);

    return parseId;
  }
};

export default useGetIdFromLink;
