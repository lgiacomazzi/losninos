import styled from "styled-components/native";

export const Circle = styled.View`
  height: ${props => (props.size ? props.size * 40 + "px" : "40px")}
  width: ${props => (props.size ? props.size * 40 + "px" : "40px")}
  background-color: ${props => (props.active ? props.bColor : "#e2e4e6")}
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
