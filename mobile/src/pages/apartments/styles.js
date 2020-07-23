import styled from "styled-components/native";

export const AptCard = styled.TouchableOpacity`
  background-color: ${props => (props.alugado ? "#e2e4e6" : "white")};
  border-radius: 10px;
  padding: 14px;
  /* border-top-width: 1px;
  border-bottom-width: 1px;
  border-left-width: 1px; */
  /* border-right-width: 8px; */
  border-color: #eeeeee;
  border-width: ${props => (props.alugado ? "0" : "1px")};
  color: #253858;
  ${props => props.alugado || "box-shadow: 0px 5px 5px #00000020;"};
  /* width: 160px; */
  margin: 10px 10px 10px 10px;
  flex: 1;
`;

export const AptCardCard = styled.View`
  /* background-color: #343a40; */
  /* border-radius: 10px; */
  /* padding: 14px 0; */
  /* border: 1px solid #eeeeee; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
`;

export const AptCardTitle = styled.Text`
  font-weight: bold;
  color: #253858;
  font-size: 20px;
  margin-bottom: 6px;
`;

export const AptCardCardText = styled.Text`
  color: #253858;
  font-weight: 500;
`;

export const AptHistory = styled.ScrollView``;
