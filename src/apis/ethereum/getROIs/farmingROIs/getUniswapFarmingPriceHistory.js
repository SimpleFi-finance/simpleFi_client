import { getUniswapBalanceHistory, getPairReserveUSDAtBlock } from "../../protocolQueries";

async function getOneUniswapHistReceiptPrice (blockNumber, userAccount, poolAddress) {
  const rawData = await getUniswapBalanceHistory(userAccount);
  let targetBlock;
  targetBlock = rawData.data.liquidityPositionSnapshots.find(data => data.block === Number(blockNumber));

  
  // additional call in the case of reward claims
  if (!targetBlock) {
    const pairReserveData = await getPairReserveUSDAtBlock(Number(blockNumber), poolAddress);
    targetBlock = pairReserveData.data.pair;
  }
  // @dev: targetBlock will have a liquidityTokenTotalSupply property if fetched using getUniswapBalanceHistory and totalSupply if using etPairReserveUSDAtBlock
  const pricePerToken = Number(targetBlock.reserveUSD) / Number(targetBlock.liquidityTokenTotalSupply || targetBlock.totalSupply);
  const txDate = new Date(Number(targetBlock.timestamp) * 1000);
  
  return {pricePerToken, txDate};
}

export default getOneUniswapHistReceiptPrice;