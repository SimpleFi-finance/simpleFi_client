import React from 'react';
import styled from 'styled-components';

const BackdropSt = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 300;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

const backdrop = ({ show, action }) => (
    show ? <BackdropSt onClick={action}></BackdropSt> : null
);

export default backdrop;