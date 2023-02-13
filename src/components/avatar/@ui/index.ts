import styled, { keyframes } from "styled-components";

const anim = keyframes`
    from {
        opacity: 0;
        transform: scale(0.3);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

export const Avatar = styled.img`
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  animation: ${anim} 0.3s forwards;
`;
