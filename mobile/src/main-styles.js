import styled from "styled-components/native";

export const Title = styled.Text`
  font-weight: 700;
  letter-spacing: -1;
  color: #253858;
  font-size: 28px;
  text-transform: lowercase;
`;

export const Container = styled.ScrollView`
  /* padding: 10px 0px; */
  background-color: #f8f9fa;
  /* background-color: white; */
  flex: 1;
`;

export const Card = styled.View`
  background-color: white;
  border-radius: 10px;
  margin: 10px 10px;
  padding: 14px;
  /* border: 1px solid #eeeeee; */
  /* color: #253858; */
  display: flex;
  box-shadow: 3px 3px 10px #acbcd650;
`;

export const ModalCard = styled.View`
  background-color: white;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 30px;
  border: 1px solid #eeeeee;
  box-shadow: 3px 3px 10px #00000010;
`;

export const InputTexto = styled.TextInput`
  background-color: #e2e4e6;
  border-radius: 10px;
  height: 40px;
  padding: 10px;
  margin: 10px 20px;
  font-size: 18px;
`;

export const InputLabel = styled.Text`
  padding: 0 25px;
  margin-top: 10px;
  font-size: 14px;
  color: #253858;
`;

export const InfoText = styled.Text`
  margin: auto;
  padding: 10px 0;
  width: 80%;
  text-align: center;
`;

export const ButtonSuccess = styled.TouchableOpacity`
  height: 50px;
  background-color: #007bff;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  z-index: 1;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
`;

export const SuccessText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 700;
`;

export const ButtonDelete = styled.TouchableOpacity`
  height: 50px;
  background-color: #f44336;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  z-index: 1;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
`;

export const DeleteText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 700;
`;
