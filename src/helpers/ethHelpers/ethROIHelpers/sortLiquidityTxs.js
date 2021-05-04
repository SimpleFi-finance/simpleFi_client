function sortLiquidityTxs (tx, userAccount, whitelist) {
  let txIn, txOut;
  let staked, unstaked;
  const txAmount = tx.value / Number(`1e${tx.tokenDecimal}`);

  if (!tx.directRelatedFarmReceiptTx) {
    if (tx.from === userAccount.toLowerCase()) {
      if (whitelist.includes(tx.to)) {
        staked = txAmount;
      } else {
        txOut = txAmount;
      }
    } else {
      if (whitelist.includes(tx.from)) {
        unstaked = txAmount;
      } else {
        txIn = txAmount;
      }
    }

  } else {
    if (tx.from === userAccount.toLowerCase()) {
      txOut = txAmount;
    } else if (tx.to === userAccount.toLowerCase()) {
      txIn = txAmount;
    } else {
      console.log('Error sorting liquidity transactions: farm receipt tx neither to or from user account');
    }
  }

  return {txIn, txOut, staked, unstaked}
}

export default sortLiquidityTxs;