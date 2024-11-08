import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

// TODO: fix button in addressForm
// TODO: add Ok for bundles
// TODO: Fix empty address font to empty order's font
// TODO: Fix number hiding iin cart
// TODO: Fix contact us number
// TODO: Invalidate all data on login
// TODO: Fix queries (Remove)
// TODO: fix this
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to an error reporting service like Sentry or Firebase Crashlytics
    console.log("Error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Something went wrong.</Text>
          <Button title="Try Again" onPress={this.handleRetry} />
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 20,
  },
});

export default ErrorBoundary;
