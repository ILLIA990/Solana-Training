import "dotenv/config"
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl
    
} from "@solana/web3.js";

import
{
    getKeypairFromEnvironment,
    airdropIfRequired
} from "@solana-developers/helpers"

const connection = new Connection(clusterApiUrl("devnet"));

console.log("Connected to devnet");

const publicKey = new PublicKey("HpBqtD9GKN4PtZTeQCZ4uycXjnLA4pfZ7jJMJYwRgzdR")
const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

await airdropIfRequired(
    connection,
    publicKey,
    1 * LAMPORTS_PER_SOL,
    0.5 * LAMPORTS_PER_SOL
)

console.log('Publickey: ', publicKey);
console.log('Balance: ', balanceInSOL);