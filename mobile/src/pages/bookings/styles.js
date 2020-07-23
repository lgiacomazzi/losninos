import styled from "styled-components/native";

export const Label = styled.View`
  padding: 10px 14px;
  background-color: ${props => (props.active ? "#007bff" : "#e2e4e6")};
  border-radius: 12px;
  margin-top: 10px;
  margin-right: 10px;
`;

export const LabelText = styled.Text`
  color: ${props => (props.active ? "white" : "#253858;")};
  font-weight: 700;
  font-size: 20px;
  text-transform: capitalize;
`;
