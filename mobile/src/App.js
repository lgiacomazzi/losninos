import React from "react";
import { View, Text, TextInput } from "react-native";
import Routes from "./routes.js";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.autoCorrect = false;

const App = () => <Routes />;

export default App;
