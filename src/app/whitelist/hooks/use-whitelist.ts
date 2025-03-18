import { onErrorAlert, onSuccessAlert } from "@/lib/alert";
import { contract } from "@/lib/contract";
import { useState } from "react";
import { useActiveAccount, useReadContract } from "thirdweb/react";

export const useWhitelist = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const account = useActiveAccount();
  const { data: isWhitelisted, refetch } = useReadContract({
    contract,
    method: "getNFTHolders",
  });

  const handleWhitelistAddress = async () => {
    setIsLoading(true);
    try {
      if (!token || !email) {
        throw new Error("Token dan email wajib diisi");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/whitelist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userAddress: account?.address,
            token,
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      refetch();
      onSuccessAlert("Alamat berhasil didaftarkan ke whitelist");
    } catch (error) {
      onErrorAlert(
        error instanceof Error ? error.message : "Terjadi kesalahan"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    token,
    email,
    account,
    isWhitelisted,
    setToken,
    setEmail,
    handleWhitelistAddress,
  };
};
