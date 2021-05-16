import styled, { keyframes } from 'styled-components'
import transition from "styled-transition-group";

export const Container = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  color:  inherit;
  overflow: hidden;
`;

export const TitleSt = styled.div`
  margin: 5px auto;
  margin-bottom: 25px;
  height: max-content;
  width: max-content;
`;

export const TransitionSt = transition.div`

  &:enter {
    opacity: 0;
  }

  &:enter-active {
    opacity: 1;
    transition: all 0.5s;
  }

  &:exit {
    opacity: 1;
  }

  &:exit-active {
    opacity: 0;
    transition: all 0.5s;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(2160deg)
  }
`;
export const LogoSpinner = styled.div`
  width: 60px;
  height: 60px;
  z-index: 3;
  position: absolute;
  bottom: 10px;
  right: 10px;
  animation-name: ${rotate};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(.53,.06,.5,1);
`;

export const LoadingAnimation = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProgressBar = styled.div`
  position: absolute;
  z-index:3;
  top: 0px;
  left: 0px;
  height: max-content;
  width: 100%;
`;
export const LoadingTextContainer = styled.div`
  margin: 5px;
  position: absolute;
  top: 40%;
  left: 50px;
  z-index: 3;
  height: 80px;
  width: 350px;
  display: flex;
  justify-content: center;
  position: relative;
`;

// export const LoaderEl = styled.div`
//   width: 350px;
//   height: 250px;
//   position: fixed;
//   border-radius: 90px;
//   margin: auto;
//   border-radius: 10px;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   text-align: center;
//   line-height: 120px;
//   font-family: sans-serif;
//   color: #ffffff;
//   font-size: 16px;
// `;

// export const LoaderText = styled.div`
//   position: absolute;
//   border-radius: 50px;
//   left: 0;
//   right: 0;
//   top: 0;
//   bottom: 0;
//   background: transparent repeat-x 0 300px/400px 900px url('data:image/png;base64,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'); 
//   z-index: 2;
//   animation: ${wave} 1.5s ease-out forwards;
// `;
// export const Drops = styled.div`
//   -webkit-filter: url('#liquid');
//   filter: url('#liquid');
//   position:absolute;
//   top:0;
//   left:0;
//   bottom:0;
//   right:0;
//   z-index: 1;
//   opacity: 0;
//   animation: ${fadeIn} .1s linear .4s forwards;

//   div {
//     width: 21px;
//     height: 24px;
//     border-radius: 50%;
//     position: absolute;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     margin: auto;
//     background-color: ${({theme}) => theme.activeItem}
//   }
// `;

// export const Drop1 = styled.div`
//   width: 90px;
//   height: 16px;
//   bottom: 2px;
//   border-radius: 0;
// `;

// export const Drop2 = styled.div`
//   animation: ${drop} 1.3s cubic-bezier(1,.19,.66,.12) .5s infinite;
// `;


