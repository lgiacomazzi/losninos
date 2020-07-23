import styled from "styled-components/native";

export const Bubble = styled.TouchableOpacity`
  color: #000;
`;

export const Circle = styled.View`
  width: ${props => props.size * 60 || 60};
  height: ${props => props.size * 60 || 60};
  background-color: ${props => props.color || "black"};
  border-radius: 60px;
  /* border: 4px solid #eee; */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
