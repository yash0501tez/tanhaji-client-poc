// TODO 8 - Fetch storage of the Lottery by completing fetchStorage
import axios from "axios";

export const fetchStorage = async () => {
  const res = await axios.get(
    "https://api.ghostnet.tzkt.io/v1/contracts/KT1Xfk3SbQCjwx3wKgGMbL8Y2aFBTLHsuSgw/storage",
  );
  return res.data;
};

export const fetchSwordNFTStorage = async () => {
  const res = await axios.get(
    "https://api.ghostnet.tzkt.io/v1/contracts/KT1HJwf9aKZC5jvCPrAqYFHgg3onme7d9WNk/storage",
  );
  return res.data;
};
