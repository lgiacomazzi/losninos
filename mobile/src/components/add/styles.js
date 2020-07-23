import styled from "styled-components/native";

export const MenuAdd = styled.TouchableOpacity`
  /* box-shadow: 10px 3px 3px #00000010; */
  height: 35px;
  width: 35px;
  background-color: ${props => (props.activeFilter ? "#007bff" : "#e2e4e6")};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  /* border: 1px solid #eee; */
  /* position: absolute; */
  /* right: 20; */
  /* z-index: 1; */
`;
