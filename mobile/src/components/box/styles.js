import styled from "styled-components/native";

export const Square = styled.TouchableOpacity`
  background-color: ${props => props.bColor || "white"};
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  margin-right: 10px;
  /* margin-top: 10px; */
  border-radius: 10px;
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
  height: 80px;
`;

export const SquareSmall = styled.Text`
  color: ${props => props.color || "#253858"};
  font-weight: 700;
`;
