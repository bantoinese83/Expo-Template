import React, { ErrorInfo, ReactNode } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { errorTracking } from "../services/ErrorTracking";
import { logger } from "../utils/logger";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error("Global Error Caught", error, errorInfo);
    errorTracking.captureException(error, { errorInfo });
  }

  handleRestart = () => {
    this.setState({ hasError: false, error: null });
    // In a real app, you might use Updates.reloadAsync()
  };

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 bg-white items-center justify-center p-6">
          <View className="w-20 h-20 bg-rose-50 rounded-full items-center justify-center mb-6">
            <MaterialCommunityIcons name="alert-circle-outline" size={40} color="#f43f5e" />
          </View>
          <Text className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</Text>
          <Text className="text-slate-500 text-center mb-8">
            The application encountered an unexpected error.
          </Text>
          <TouchableOpacity
            onPress={this.handleRestart}
            className="bg-indigo-600 px-8 py-4 rounded-xl shadow-lg"
          >
            <Text className="text-white font-bold">Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
