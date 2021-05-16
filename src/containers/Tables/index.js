import React from 'react'
import TokensTable from '../../components/TableTypes/TokensTable'
import EarningsTable from '../../components/TableTypes/EarningsTable'
import FarmingTable from '../../components/TableTypes/FarmingTable'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import helpers from '../../helpers'
import { withRouter } from 'react-router-dom'

const TableContainerSt = styled.div`
  width: 100%;
  height: 90%;
  margin: auto;
  position: relative;
`;

const TableView = (props) => {
  const { pathname } = useLocation()
  const {
    tokens,
    tokenPrices,
    history,
    investments
  } = props

  const { summaryTableValues } = helpers.extractSummaryHoldingValues(tokens, tokenPrices);
  const { farmingFields, earningFields } = helpers.extractSummaryFieldValues(investments);
  
  const tokensWithPrices = () => summaryTableValues.baseTokens.map(el => ({
    id: el.id,
    userBalance: el.userBalance,
    name: el.name,
    api: el.priceApi,
    currentPrice: el.tokenPrice['usd'],
    lockedAmount: el.lockedpercent
  }))
  const earningData = () => earningFields;
  const farmingData = () => farmingFields;

  const sendToDetails = (id, type) => {
    return history.push(`/${type}/${id}`)
  }

  return (
    <TableContainerSt>
      {pathname === '/tokens' &&
        <TokensTable
          tableId='tokensTable'
          sortable
          filterable
          data={tokensWithPrices()}
          align="center"
          stickyHeader
          stickyHeaderTop='0px'
          onRowClick={(tokenId) => sendToDetails(tokenId, 'tokens')}
        />
      }
      {pathname === '/earning' &&
        <EarningsTable
          tableId='earningsTable'
          sortable
          filterable
          data={earningData()}
          align="center"
          stickyHeader
          stickyHeaderTop='0px'
          onRowClick={(investmentId) => sendToDetails(investmentId, 'earning')}
        />
      }
      {pathname === '/farming' &&
        <FarmingTable
          tableId='farmingTable'
          sortable
          filterable
          data={farmingData()}
          align="center"
          stickyHeader
          stickyHeaderTop='0px'
          onRowClick={(farmingId) => sendToDetails(farmingId, 'farming')}
        />
      }
    </TableContainerSt>
  )
}

const mapState = state => {
  return {
    tokens: state.App.userData.tokens.data,
    investments: state.App.userData.investments.data,
    tokenPrices: state.App.userData.tokenPrices.data
  }
}
export default connect(mapState)(withRouter(TableView));