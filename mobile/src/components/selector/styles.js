import styled from "styled-components/native";

export const Label = styled.View`
  padding: 10px 5px;
  background-color: ${props => (props.active ? "#c9e3ff" : "#eee")};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  width: 80px;
  margin: 5px;
`;

export const LabelText = styled.Text`
  color: ${props => (props.active ? "#003671" : "#253858")};
  font-weight: 500;
  font-size: 16px;
  text-transform: capitalize;
`;
