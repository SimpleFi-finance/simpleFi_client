export default function extractSummaryHoldingValues (userTokens, userTokenPrices) {
  const summaryTableValues = {
    baseTokens: [],
    receiptTokens: []
  };
  const overviewValues = {
    totalInvested: 0,
    totalUnclaimed: 0,
    totalValue: 0
  };

  userTokens.forEach(token => {
    let lockedBalance = 0;
    let unclaimedBalance = 0;
    let combinedBalance = 0;
    let lockedPercent = 0;
    const tokenPrice = userTokenPrices[token.name];

    if (token.lockedBalance) {
      lockedBalance = token.lockedBalance.reduce((acc, curr) => acc + curr.balance, 0);
    }
    if (token.unclaimedBalance) {
      unclaimedBalance = token.unclaimedBalance.reduce((acc, curr) => acc + curr.balance, 0);
    }
    if (token.userBalance) {
      combinedBalance = token.userBalance + lockedBalance + unclaimedBalance;
      lockedPercent = (lockedBalance + unclaimedBalance) / combinedBalance;
    } else {
      combinedBalance = lockedBalance + unclaimedBalance;
      lockedPercent = 1;
    }

    if (token.isBase) {
      summaryTableValues.baseTokens.push({
        id: token.tokenId,
        name: token.name,
        priceApi: token.priceApi,
        userBalance: Number(combinedBalance.toFixed(2)),
        lockedpercent: lockedPercent,
        tokenPrice: {
          usd: Number(tokenPrice.usd.toFixed(2)),
          eur: Number(tokenPrice.eur.toFixed(2)),
          gbp: Number(tokenPrice.gbp.toFixed(2)),
        }
      });
      overviewValues.totalInvested += lockedBalance * tokenPrice.usd;
      overviewValues.totalUnclaimed += unclaimedBalance * tokenPrice.usd;
      overviewValues.totalValue += combinedBalance * tokenPrice.usd
      
    } else {
      summaryTableValues.receiptTokens.push({
        id: token.tokenId,
        priceApi: token.priceApi,
        name: token.name,
        userBalance: Number(combinedBalance.toFixed(2)),
        lockedpercent: lockedPercent,
        tokenPrice: {
          usd: Number(tokenPrice.usd.toFixed(2)),
          eur: Number(tokenPrice.eur.toFixed(2)),
          gbp: Number(tokenPrice.gbp.toFixed(2)),
        }
      });
    }
  });

  return {summaryTableValues, overviewValues};
}

export {
  extractSummaryHoldingValues,
}
