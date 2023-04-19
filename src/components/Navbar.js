import { useEffect, useState } from "react";
import { connectWallet, getAccount, clearAccount } from "../utils/wallet";

const Navbar = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    (async () => {
      // TODO 5.b - Get the active account
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);

  // TODO 4.a - Complete onConnectWallet function
  const onConnectWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(account);
  };

  const onDisconnectWallet = async () => {
    await clearAccount();
    setAccount("");
  };

  return (
    <div className="navbar navbar-dark bg-dark fixed-top">
      <div className="container py-2">
        <a href="/" className="navbar-brand">
          Tezos Lottery
        </a>
        <div className="d-flex">
          {/* TODO 4.b - Call connectWallet function onClick  */}
          <button className="btn btn-outline-info" onClick={onConnectWallet}>
            {/* TODO 5.a - Show account address if wallet is connected */}
            Connect Wallet
          </button>
          {account ? (
            <p style={{ color: "white" }}>
              {account}
              <button
                className="btn btn-outline-info"
                onClick={onDisconnectWallet}
              >
                Disconnect Wallet
              </button>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
