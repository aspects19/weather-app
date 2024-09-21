import { Alert } from "react-native";

const CustomAlert = ({ title, text, }) =>
  Alert.alert(title, text,[
    {
      text: "Retry",
      onPress: () =>console.log("Pressed Retry")
    },
    {
      text: "Okay",
      onPress: () =>console.log("Pressed okay")
    },
  ])
{
  
};

export default CustomAlert;