
export default function filterRelatedFarmReceiptTokenTxs(trackedFields, trackedTokens, userTokenTransactions, receiptToken) {
  const relatedFarmsWithReceiptTokens = trackedFields.filter(trackedField => {
    if (trackedField.receiptToken && !trackedField.isEarning) {
      return trackedField.seedTokens.some(seedToken => seedToken.tokenId === receiptToken.tokenId);
    }
    return false;
  })

  const relatedFarmReceiptTokens = relatedFarmsWithReceiptTokens.map(relatedField => trackedTokens.find(trackedToken => trackedToken.tokenId === relatedField.receiptToken));
  const relatedFarmReceiptTokenTxs = relatedFarmReceiptTokens.reduce((acc, curr) => acc.concat(userTokenTransactions.filter(tx => tx.contractAddress === curr.address.toLowerCase())), []);
  
  return relatedFarmReceiptTokenTxs
}