function createWhitelist(trackedFields, field) {
  const whitelist = [];
  trackedFields.forEach(trackedField => {  
    /* @dev: - checking !trackedField.isEarning excludes staking/providing liquidity to an earning field with 
               another earning field's receipt tokens. This avoids double counting ROI.
               It is a similar check(and necessary/complementary) to Rewinder()'s excludeFeeder flag
               The side effect is that it won't be considered a "staking" event in the field's details table
    */
    if (!trackedField.isEarning) {
      trackedField.seedTokens.forEach(seedToken => {
        if (seedToken.tokenId === field.receiptToken) {
          const depositAddresses = trackedField.contractAddresses.filter(address => address.addressTypes.includes('deposit'));
          depositAddresses.forEach(depositAddress => whitelist.push(depositAddress.address.toLowerCase()))
        }
      })
    }
  })
  return whitelist;
}

export default createWhitelist