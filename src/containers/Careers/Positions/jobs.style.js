import styled from 'styled-components'

export const Title = styled.h2`
  font-size: 1.7em;
  padding: 5px 0px;
  margin: 10px auto;
  line-height: 1.2em;
`;

export const Section = styled.div`
  width: 80%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  h3 {
    margin: 10px 0;
    text-decoration: underline;
  }
`;

export const GetInTouch = styled.div`
  width: 80%;
  margin: 2px auto;
  font-size: 1.4em;
  display: flex;
  justify-content: center;
  p{
    margin: auto;
  }
  a {
    color: ${({ theme }) => theme.activeItem};
    text-decoration: underline;
    cursor: pointer;
  }
`;