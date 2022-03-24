import React from "react";
import { StyleSheet, View } from "react-native";
import { Paragraph, Button, Colors, useTheme } from "react-native-paper";

interface ErrorMessageProps {
  func: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ func }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.errorContainer}>
      <Paragraph style={styles.errorMessage}>
        Something went wrong while downloading photos
      </Paragraph>
      <Button color={colors.third} mode="contained" onPress={func}>
        Reload
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  errorMessage: {
    color: Colors.red400,
    textAlign: "center",
    marginBottom: 50,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ErrorMessage;
