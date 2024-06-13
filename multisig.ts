import { clusterApiUrl, Connection, Keypair } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, createMultisig, getMint } from '@solana/spl-token';

const signer1 = Keypair.generate();
const signer2 = Keypair.generate();
const signer3 = Keypair.generate();

console.log(signer1.publicKey.toBase58());
console.log(signer2.publicKey.toBase58());
console.log(signer3.publicKey.toBase58());
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// const payer = getKeypairFromEnvironment("SECRET_KEY");
const payer = Keypair.generate();
const multisigKey = await createMultisig(
    connection,
    payer,
    [
      signer1.publicKey,
      signer2.publicKey,
      signer3.publicKey
    ],
    2
  );
  
  console.log(`Created 2/3 multisig ${multisigKey.toBase58()}`);

const mint = await createMint(
    connection,
    payer,
    multisigKey,
    multisigKey,
    9
);

const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    signer1.publicKey
);
try {
    await mintTo(
      connection,
      payer,
      mint,
      associatedTokenAccount.address,
      multisigKey,
      1
    )
} catch (error) {
    console.log(error);
}


await mintTo(
    connection,
    payer,
    mint,
    associatedTokenAccount.address,
    multisigKey,
    1,    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    [
      signer1,
      signer2
    ]
)
  
const mintInfo = await getMint(
    connection,
    mint
)
  
console.log(`Minted ${mintInfo.supply} token`);

// Minted 1 tokenLAMPORTS_PER_SOL