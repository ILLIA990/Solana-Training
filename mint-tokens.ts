import { mintTo } from "@solana/spl-token";
import "dotenv/config";
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
const connection = new Connection(clusterApiUrl("devnet"));

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const sender = getKeypairFromEnvironment("SECRET_KEY");

const tokenMintAccount = new PublicKey(
  "HNqDcFz6UNvfTZYFvZCDiV4FsZLk9umXZGaqNV6HA6TW"
);

const recipientAssociatedTokenAccount = new PublicKey(
    "CTjoLdEeK8rk4YWYW9ZqACyjHexbYKH3hEoagHxLVEFs"
  );
  
  const transactionSignature = await mintTo(
    connection,
    sender,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    sender,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
  );
  
  const link = getExplorerLink("transaction", transactionSignature, "devnet");
  
  console.log(`✅ Success! Mint Token Transaction: ${link}`);