import styled from "styled-components";

export const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  & > a {
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
  }
`;

export const MainWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    & > h1 {
        color: white;
        text-align: center;
    }
`;