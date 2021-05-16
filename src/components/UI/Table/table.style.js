import styled, {css} from 'styled-components'

export const TableContainer = styled.div`
  width: calc(100% - 8px);
  padding: 0px;
  background-color: transparent;
  clear: both;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 0px 4px;

  table {
    width: 100%;
    text-align: ${({ align }) => align || 'left'};
    background-color: transparent;
    z-index: 1;
    border-collapse: collapse;

    thead {
      z-index: 3;
      height: min-content;
      color: ${({ theme }) => theme.background};
    }
    
    th {
      font-size: 16px;
      min-height: 20px;
      z-index: 3;
      text-align: left;
      font-weight: bold;
      padding: 15px 4px;
      text-transform: capitalize;
      background-color: ${({ theme }) => theme.lighterBackground};
      
      &:first-of-type {
        padding-left: 5%;
        border-bottom-left-radius: 30px;
        border-top-left-radius: 30px;
      }
      &:last-of-type {
        padding-right: 5%;
        border-bottom-right-radius: 30px;
        border-top-right-radius: 30px;
      }
      ${({ stickyHeader, stickyHeaderTop }) =>
        stickyHeader &&
        css`
          top: ${stickyHeaderTop};
          position: sticky;
        `
      }
    }

    tbody {
      z-index: 1;
      tr {
        align-items: center;
        z-index: 1;

        &:hover {
          & > td {
            background-color: ${({theme}) => theme.opaqueGrey};
          }
        }
        td {
          font-size: 14px;
          padding: 0px 8px 0px 8px;
          border-bottom: 1px solid transparent;
          color: ${({theme}) => theme.text};
          &:first-of-type {
            padding-left: 5%;
            border-bottom-left-radius: 30px;
            border-top-left-radius: 30px;
          }
          &:last-of-type {
            padding-right: 5%;
            border-bottom-right-radius: 30px;
            border-top-right-radius: 30px;
          }
        }
      }
    }
  }
`;