function extractSummaryFieldValues (userFields) {
  const farmingFields = [];
  const earningFields = [];
  const totalInvested = {
    farmingInv: 0,
    earningInv: 0
  };
  const totalROI = {
    farmingROI: 0,
    earningROI: 0
  }

  userFields.forEach(field => {
    const { stakedPercent } = combineFieldBalances(field);
    //CHECK: quid using investmentValue and allTimeROI when a field has both farming and earning returns
    const { name, cropTokens, isEarning, investmentValue, earningROI, farmingROI } = field;
    
    if (cropTokens.length) {
      let farming = '';
      cropTokens && cropTokens.forEach(token => farming += `${token.name}, `);
      farming = farming.slice(0, -2);

      totalROI.farmingROI += farmingROI.allTimeROI * investmentValue;
      totalInvested.farmingInv += investmentValue;
      
      const APY = field.farmingAPY?.combinedAPY ? field.farmingAPY.combinedAPY : field.farmingAPY;
      const ROI = farmingROI.allTimeROI;
      const invested = Number(investmentValue?.toFixed(2));

      farmingFields.push({
        id: field.fieldId,
        name: name,
        investedValue: invested,
        farmingField: farming,
        ROI: ROI,
        APY: APY
      })
    }
    
    if (isEarning) {
      //FIXME: ROI weight should be based on the historic investment value
      totalROI.earningROI += earningROI.allTimeROI * investmentValue;
      totalInvested.earningInv += investmentValue;
      
      const APY = field.earningAPY;
      const ROI = earningROI.allTimeROI;
      const invested = Number(investmentValue?.toFixed(2));
      
      earningFields.push({
        id: field.fieldId,
        name: name,
        investedValue: invested,
        stakedValue: stakedPercent,
        ROI: ROI,
        APY: APY
      });
    }
  })

  if (totalROI.farmingROI) {
    totalROI.farmingROI = totalROI.farmingROI / totalInvested.farmingInv;
  }

  if (totalROI.earningROI) {
    totalROI.earningROI = totalROI.earningROI / totalInvested.earningInv;
  }

  return {farmingFields, earningFields, totalInvested, totalROI}
}

function combineFieldBalances(field){
       
      let stakedBalance = 0;
      let combinedBalance = 0;
      let stakedPercent = 0;
      
      if (field.stakedBalance) {
        stakedBalance = field.stakedBalance.reduce((acc, curr) => acc + curr.balance, 0);
      }

      if (field.userBalance) {
        combinedBalance = field.userBalance + stakedBalance;
        stakedPercent = stakedBalance / combinedBalance;
      } else {
        combinedBalance = stakedBalance;
        stakedPercent = 1;
      }
      
  return {
    combinedBalance: combinedBalance.toFixed(2),
    stakedPercent
  };
}

export {
  extractSummaryFieldValues
}