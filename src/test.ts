import { UserSigner, UserWallet } from "@multiversx/sdk-wallet/out";

const key = {
  userWallet: {
    version: 4,
    kind: "secretKey",
    id: "a5184b3e-ef17-48c0-abc4-60d0e31892aa",
    address: "9fb927c978225cb7a93b8b3cd8d8423e176e009dc284c536d9c4372bbe128487",
    bech32: "erd1n7uj0jtcyfwt02fm3v7d3kzz8ctkuqyac2zv2dkecsmjh0sjsjrs29mnqs",
    crypto: {
      ciphertext:
        "73e69743531a4f011719603d55b5cf8428ee2196934c285f4bfbd28275f727e37f7c6d46633ba4265eff4aedddd21a369c9b5ba70ec64c9216294bffd3ed6342",
      cipherparams: {
        iv: "a377464b58b5266089406f2ae6af291c",
      },
      cipher: "aes-128-ctr",
      kdf: "scrypt",
      kdfparams: {
        dklen: 32,
        salt: "3e9245d67459daea3acde56a5fd7592422070da2ecaae3438379b63b3c1a4ef0",
        n: 4096,
        r: 8,
        p: 1,
      },
      mac: "b66c48a4d7107707f7dcf5c7f18f310c73993b16add5e38c36cfe6f28a2d58f2",
    },
  },
  password: "oy00ngy9xf",
};

const signer = UserSigner.fromPem(
  `-----BEGIN PRIVATE KEY for erd1n7uj0jtcyfwt02fm3v7d3kzz8ctkuqyac2zv2dkecsmjh0sjsjrs29mnqs-----
ZGU1NGQ2ZjBjMWI4MGQwNWNmZTBhYTYxZjIzYjRiMzg3MjY0YmU1M2MzYjM2MDk3
NTlkNzdkZTZjYmVmMGQzMDlmYjkyN2M5NzgyMjVjYjdhOTNiOGIzY2Q4ZDg0MjNl
MTc2ZTAwOWRjMjg0YzUzNmQ5YzQzNzJiYmUxMjg0ODc=
-----END PRIVATE KEY for erd1n7uj0jtcyfwt02fm3v7d3kzz8ctkuqyac2zv2dkecsmjh0sjsjrs29mnqs-----`,
);
console.log(signer.getAddress().bech32());
console.log(
  UserWallet.decrypt(key.userWallet, key.password)
    .generatePublicKey()
    .toAddress()
    .bech32(),
);
