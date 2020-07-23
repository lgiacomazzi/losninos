import styled from "styled-components/native";

export const Line = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

export const Body = styled.View`
  flex-direction: column;
  flex: 1;
  padding: 0 10px;
  align-items: flex-start;
`;

export const Price = styled.View`
  background-color: #dae8ff;
  /* background-color: #253858; */
  border-radius: 4px;
  padding: 5px 10px;
  min-width: 10;
`;

export const Label = styled.View`
  padding: 8px 12px;
  background-color: ${props => (props.active ? "#dae8ff" : "#e2e4e6")};
  border-radius: 12px;
  margin-right: 5px;
`;

export const LabelText = styled.Text`
  color: #253858;
  font-weight: 500;
  text-transform: capitalize;
`;

export const ScrollButtons = styled.ScrollView`
  flex: none;
`;
