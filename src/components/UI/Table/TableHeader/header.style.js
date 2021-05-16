import styled from 'styled-components'

export const TableHeader = styled.th`
  position: relative;
  min-width: ${({ width }) => `${width}` || 'auto'};
  
`;