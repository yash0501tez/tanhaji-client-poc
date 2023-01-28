import { useState, useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import {
  startVotingOperation,
  voteCandidateOperation,
  endVotingOperation,
  resetVotingOperation,
  mintNftOperation,
} from "./utils/operation";
import { fetchStorage } from "./utils/tzkt";
import axios from "axios";

const App = () => {
  // Players holding lottery tickets
  const [status, setStatus] = useState("");
  const [voteCountA, setVoteCountA] = useState(0);
  const [voteCountB, setVoteCountB] = useState(0);
  const [loading, setLoading] = useState(false);

  // Set players and tickets remaining
  // useEffect(() => {
  //   // TODO 9 - Fetch players and tickets remaining from storage
  //   (async () => {
  //     const storage = await fetchStorage();
  //     // console.log(storage);
  //     setStatus(Object.values(storage.status));
  //     setVoteCountA(Object.values(storage.candidate_A_votes));
  //     setVoteCountB(Object.values(storage.candidate_B_votes));
  //   })();
  // }, [status, voteCountA, voteCountB]);

  // TODO 7.a - Complete onBuyTicket function
  const startVoting = async () => {
    try {
      setLoading(true);
      await startVotingOperation();
      alert("transaction successful");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const voteFor = async (candidate) => {
    try {
      setLoading(true);
      await voteCandidateOperation(candidate);
      alert("transaction successful");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const endVoting = async () => {
    try {
      setLoading(true);
      await endVotingOperation();
      alert("transaction successful");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  const resetVoting = async () => {
    try {
      setLoading(true);
      await resetVotingOperation();
      alert("transaction successful");
    } catch (err) {
      alert(err.message);
    }
  };

  const mintNft = async () => {
    try {
      setLoading(true);
      let _mint = {
        data_bytes: "05070707070a0000001600008f142637d0360ef8016effc36706f1e10d57866a000a0000",
        sig: "edsigtbMEnu61ZG4Dds7ndtGhbtaM3p2DRWfHEVQX3h6K8kbmiiG2pLWgNSgQng78rrjSpnR4ADAMRckbkjDJNXDuy2j4AgAxMt",
      };
      await mintNftOperation(_mint);
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
      data
    );
    console.log(res);
  };

  return (
    <div className="h-100">
      <Navbar />
      <div>
        <h1>Mint</h1>
        <button onClick={mintNft}>Mint NFT</button>
        <button onClick={create_sign}>Create Sign</button>
      </div>
      <div>
        <p className="m-5 p-5">Status = {status}</p>
        <p>Vote Count A = {voteCountA}</p>
        <p>Vote Count B = {voteCountB}</p>
        <br />
        <button onClick={startVoting}>
          {loading ? "Loading..." : "Start Voting"}
        </button>
        <br />
        <button onClick={() => voteFor("A")}>
          {loading ? "Loading..." : "Vote For A"}
        </button>
        <button onClick={() => voteFor("B")}>
          {loading ? "Loading..." : "Vote For B"}
        </button>
        <br />
        <button onClick={endVoting}>
          {loading ? "Loading..." : "End Voting"}
        </button>
        <br />
        <button onClick={resetVoting}>
          {loading ? "Loading..." : "Reset Voting"}
        </button>
      </div>
    </div>
  );
};

export default App;
