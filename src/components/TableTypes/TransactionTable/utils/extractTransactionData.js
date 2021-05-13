export default function extractTempFieldDetailsCells(tx) {
  const {
    txIn,
    txOut,
    staked,
    unstaked,
    stakingAmount,
    unstakingAmount,
    rewardAmount,
    txDate,
    pricePerToken,
    pricePerFarmSeedToken,
    userBalanceAfterTx
  } = tx;
  
  const actions = {
    txIn: {
      action: 'accumulated',
      balEffect: 'plus',
      amount: txIn
    },
    txOut: {
      action: 'exited',
      balEffect: 'minus',
      amount: txOut
    },
    staked: {
      action: 'staked',
      balEffect: 'neutral',
      amount: staked
    },
    unstaked: {
      action: 'unstaked',
      balEffect: 'neutral',
      amount: unstaked
    },
    stakingAmount: {
      action: 'staked',
      balEffect: 'plus',
      amount: stakingAmount
    },
    unstakingAmount: {
      action: 'unstaked',
      balEffect: 'minus',
      amount: unstakingAmount
    },
    rewardAmount: {
      action: 'claimed',
      balEffect: 'neutral',
      amount: rewardAmount
    },
  }

  const txData = Object.keys(tx).map(el => {
    if (tx[el] && actions[el]) {
      return actions[el]
    }
    return null
  }).find(el => el);
  
  return {
    id: tx.tx.hash,
    date: txDate.toLocaleString('en-GB').split(',')[0],
    action: txData.action,
    amount: txData.amount,
    balanceEffect: txData.balEffect,
    priceData: { pricePerToken, pricePerFarmSeedToken, userBalanceAfterTx }
  };
}