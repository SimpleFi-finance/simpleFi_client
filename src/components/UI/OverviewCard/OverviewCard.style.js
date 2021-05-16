import styled, { css } from 'styled-components'

export const Card = styled.div`
  display: flex;
  border-radius: 30px;
  box-shadow: 0 0px 2px 0px ${({ theme }) => theme.lightpurple};
  min-width: 220px;
  min-height: 120px;
`;

export const CardContent = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 1.5em;
    font-weight: 300;
    color: ${({ theme }) => theme.text};
    margin-bottom: 15px;
  }

  h2 {
    font-size: 1.5em;
    color: ${({ theme }) => theme.hoverColor};

    ${({ type }) => type === 'percent' &&
    css`
      &::after {
        content: '%';
      }
      &::before {
        content: '';
      }
    `
    }
  }

  ${({ value }) =>
    value === '-' &&
    css`
      h2 {
        font-size: 1.5em;
        color: ${({ theme }) => theme.error};
      }
    `
  }
  ${({ value }) =>
    value === '+' &&
    css`
      h2 {
        font-size: 1.5em;
        color: ${({ theme }) => theme.green};
      }
    `
  }
`;