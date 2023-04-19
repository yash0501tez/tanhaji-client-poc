import { useState, useEffect } from "react";
import { bytes2Char } from "@taquito/utils";

// Components
import Navbar from "./components/Navbar";
import {
  // startVotingOperation,
  // voteCandidateOperation,
  // endVotingOperation,
  // resetVotingOperation,
  mintNftOperation,
  mintSwordNftOperation,
} from "./utils/operation";
import { fetchStorage } from "./utils/tzkt";
import axios from "axios";

const App = () => {
  // Players holding lottery tickets
  const [status, setStatus] = useState("");
  // const [voteCountA, setVoteCountA] = useState(0);
  // const [voteCountB, setVoteCountB] = useState(0);
  const [loading, setLoading] = useState(false);

  const mintNft = async () => {
    try {
      setLoading(true);
      let _mint = {
        data_bytes:
          "05070707070a000000160000fadcd216de7817afb85f7f7a39510e2ed224303200a4010000",
        sig: "edsigtYvaBbcYUgKnEHFD4edb3cQ5HiSLrywrto2vnzcKz2tT9PQPiYj3xa6KHL7Wqan5MfkdhAkNqLJJTXLHjRRtXYttZ2JunK",
      };
      await mintNftOperation(_mint);
      alert("transaction successful");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const mintSwordNFT = async () => {
    try {
      setLoading(true);
      let _mint = {
        data_bytes:
          "0507070a000000160000fe0aadebf396841125aa97142d457cd9ef87c96d07070000010000005868747470733a2f2f6261666b72656965636e766f79776375637767753533706d6c7964666a7765656c616c62686d75696864687876786a6d633774666174796f7061692e697066732e6e667473746f726167652e6c696e6b",
        sig: "edsigu51FJ56TesbixUsJ9HE639Pbb7eKmps2n7Ne9dDaspSY4eQ8m139zaYXAEyjU1FLgfDkLYLuZh1nDcZG6foVCDxAfzLq7F",
      };
      await mintSwordNftOperation(_mint);
      alert("transaction successful");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const create_sign = async () => {
    const data = {
      userid: "1234abcdef",
      address: "tz1eKCEjV4aFSo5BXUCktkN9NJtDyvRF2wxS",
      amount: 10,
      token_id: 0,
    };
    const res = await axios.post(
      "http://localhost:5001/tantest-35456/us-central1/widgets/create_sign",
      data,
    );
    console.log(res);
  };

  const getChainData = async () => {
    try {
      const res = await axios.get(
        "https://api.ghostnet.tzkt.io/v1/tokens/balances?account=tz1YgZTYk3pE3dGPpsDBdriRpLGrkBPG8suF&contract=KT1HJwf9aKZC5jvCPrAqYFHgg3onme7d9WNk",
      );
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data[i].token);
        // console.log(
        //   `https://api.ghostnet.tzkt.io/v1/contracts/KT1HJwf9aKZC5jvCPrAqYFHgg3onme7d9WNk/bigmaps/token_metadata/keys?value.token_id=${res.data[i].token.tokenId}`,
        // );
        const token_data = await axios.get(
          `https://api.ghostnet.tzkt.io/v1/contracts/KT1HJwf9aKZC5jvCPrAqYFHgg3onme7d9WNk/bigmaps/token_metadata/keys?value.token_id=${res.data[i].token.tokenId}`,
        );

        // console.log(
        //   bytes2Char(token_data.data[0].value.token_info[""])
        //     .split("//")
        //     .at(-1),
        // );

        const ipfs_cid = bytes2Char(token_data.data[0].value.token_info[""])
          .split("//")
          .at(-1);

        console.log(ipfs_cid);

        // https://bafybeienao42su3rh2epnbwev5rvijbolxtysjg46qwztu76daq7grfn2u.ipfs.dweb.link/

        // const token_metadata = await axios.get(
        //   `https://${ipfs_cid}.ipfs.dweb.link/`,
        // );

        const token_metadata = await axios.get(
          "https://gateway.pinata.cloud/ipfs/QmXq7VM5Qxbsh5up4NWA5HBfoJNeoc75eE4MT4p42BNKLx?_gl=1*1hgzzvk*_ga*ODYzODQ4NDQxLjE2NzYwMjI5ODU.*_ga_5RMPXG14TE*MTY3NjEwNzU1Mi4zLjEuMTY3NjEwOTcyMC42MC4wLjA.",
        );

        console.log(token_metadata);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    // const res = await axios.get(
    //   "https://api.ghostnet.tzkt.io/v1/tokens/balances?account=tz1YgZTYk3pE3dGPpsDBdriRpLGrkBPG8suF&contract=KT1HJwf9aKZC5jvCPrAqYFHgg3onme7d9WNk",
    // );

    // console.log(res);
  };

  return (
    <div className="h-100">
      <Navbar />
      <div>
        <div className="container">
          <img src="https://i.imgur.com/6YQ9Z9r.png" alt="logo" />
          <img src="https://i.imgur.com/6YQ9Z9r.png" alt="logo" />
          <img src="https://i.imgur.com/6YQ9Z9r.png" alt="logo" />
          <img src="https://i.imgur.com/6YQ9Z9r.png" alt="logo" />
        </div>
        <h1>Mint</h1>
        <button onClick={mintNft}>Mint NFT</button>
        <button onClick={mintSwordNFT}>Mint Sword NFT</button>
        <button onClick={create_sign}>Create Sign</button>
      </div>
      <div className="container">
        <button onClick={getChainData}>Get Chain Data</button>
      </div>
    </div>
  );
};

export default App;
