import styled from "styled-components/native";

export const MenuFechar = styled.TouchableOpacity`
  /* box-shadow: -10px 3px 3px #00000010; */
  /* box-shadow: 3px 3px 10px #00000010; */
  height: 35px;
  width: 35px;
  background-color: #e2e4e6;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #eee; */
  position: absolute;
  right: 15;
  top: ${props => props.getStatusBarHeight + 60 || 60}
  z-index: 1;
`;
