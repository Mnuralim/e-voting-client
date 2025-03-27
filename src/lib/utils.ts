import { createWallet } from "thirdweb/wallets";

export const supportedWallets = [
  createWallet("io.metamask"),
  createWallet("com.okex.wallet"),
  createWallet("com.bitget.web3"),
];

export const translateError = (errorMessage: string) => {
  const errorId = errorMessage.split("\n")[0].replace("error ", "").trim();
  switch (errorId) {
    case "Unauthorized":
      return "Anda tidak memiliki akses untuk melakukan aksi ini.";
    case "VotingNotActive":
      return "Voting belum aktif saat ini.";
    case "VotingIsActive":
      return "Voting sedang berlangsung.";
    case "AlreadyVoted":
      return "Anda sudah memberikan suara.";
    case "InvalidCandidate":
      return "Kandidat yang dipilih tidak valid.";
    case "NoNFTOwnership":
      return "Anda tidak memiliki NFT yang diperlukan untuk voting.";
    case "InvalidVotingPeriod":
      return "Durasi voting tidak memenuhi batas minimum.";
    case "InvalidSignature":
      return "Tanda tangan yang diberikan tidak valid.";
    case "InvalidElection":
      return "Pemilihan yang dimaksud tidak ditemukan.";
    case "NameCannotBeEmpty":
      return "Nama tidak boleh kosong.";
    case "NotEligibleToVote":
      return "Anda tidak memenuhi syarat untuk memberikan suara.";

    default:
      return "Terjadi kesalahan yang tidak diketahui.";
  }
};
