import React, { ErrorInfo, ReactNode } from "react";
import { View, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { AlertCircle, RefreshCw, ChevronRight } from "lucide-react-native";
import * as Updates from "expo-updates";
import { LinearGradient } from "expo-linear-gradient";

import { errorTracking } from "../services/ErrorTracking";
import { logger } from "../utils/logger";
import { AppText } from "./ui/AppText";
import { AppButton } from "./ui/AppButton";
import { AppCard } from "./ui/AppCard";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  showDetails: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, showDetails: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, showDetails: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error("Global Error Caught", error, errorInfo);
    errorTracking.captureException(error, { errorInfo });
  }

  handleRestart = async () => {
    try {
      await Updates.reloadAsync();
    } catch (_e) {
      // Fallback reload if Updates fails
      this.setState({ hasError: false, error: null });
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <LinearGradient colors={["#ffffff", "#f8fafc"]} style={StyleSheet.absoluteFill} />

          <View className="flex-1 items-center justify-center p-8">
            <View className="w-24 h-24 bg-rose-50 dark:bg-rose-900/20 rounded-full items-center justify-center mb-8 shadow-sm">
              <AlertCircle size={48} color="#f43f5e" />
            </View>

            <AppText variant="h1" className="text-center mb-3">
              Application Error
            </AppText>

            <AppText
              variant="body"
              className="text-center mb-10 text-slate-500 dark:text-slate-400"
            >
              Something unexpected happened. We've recorded the error and our team will look into
              it.
            </AppText>

            <View className="w-full space-y-4">
              <AppButton
                title="Restart Application"
                onPress={this.handleRestart}
                leftIcon={<RefreshCw size={18} color="white" />}
                className="w-full"
              />

              <AppButton
                title="Send Error Report"
                onPress={() => {}}
                variant="outline"
                className="w-full border-slate-200"
              />
            </View>

            <TouchableOpacity
              onPress={() => this.setState({ showDetails: !this.state.showDetails })}
              className="flex-row items-center py-4 mt-6"
            >
              <AppText variant="caption" className="text-slate-400 font-medium">
                Technical details
              </AppText>
              <View className={`ml-1 ${this.state.showDetails ? "rotate-90" : ""}`}>
                <ChevronRight size={14} color="#94a3b8" />
              </View>
            </TouchableOpacity>

            {this.state.showDetails && (
              <AppCard className="mt-2 w-full bg-slate-50 border-slate-100" padding="sm">
                <ScrollView className="max-h-48">
                  <AppText
                    variant="caption"
                    className="font-mono text-xs text-rose-600 dark:text-rose-400"
                  >
                    {this.state.error?.name}: {this.state.error?.message}
                  </AppText>
                  <AppText
                    variant="caption"
                    className="font-mono text-[10px] mt-2 text-slate-400 leading-4"
                  >
                    {this.state.error?.stack}
                  </AppText>
                </ScrollView>
              </AppCard>
            )}
          </View>

          <View className="pb-10 items-center">
            <AppText variant="caption" className="text-slate-300">
              Error Hash: {Math.random().toString(36).substring(7).toUpperCase()}
            </AppText>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
