import React, { ErrorInfo, ReactNode } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  Pressable,
  Appearance,
} from "react-native";
import { AlertCircle, RefreshCw, ChevronRight } from "lucide-react-native";
import * as Updates from "expo-updates";
import { LinearGradient } from "expo-linear-gradient";

import { errorTracking } from "../services/ErrorTracking";
import { logger } from "../utils/logger";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  showDetails: boolean;
  reportReference: string | null;
}

const getIsDark = () => Appearance.getColorScheme() === "dark";

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, showDetails: false, reportReference: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, showDetails: false, reportReference: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    errorTracking.captureException(error, { errorInfo });
    const reportReference =
      `REF-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`.toUpperCase();
    queueMicrotask(() => {
      logger.error("Global Error Caught", error, errorInfo);
      this.setState({ reportReference });
    });
  }

  handleRestart = async () => {
    try {
      await Updates.reloadAsync();
    } catch (_e) {
      this.setState({ hasError: false, error: null, reportReference: null, showDetails: false });
    }
  };

  handleSendReport = () => {
    const { error } = this.state;
    if (!error) return;
    errorTracking.captureException(error, {
      user_reported: true,
      report_reference: this.state.reportReference ?? undefined,
    });
    Alert.alert("Thank you", "Your report was sent. We will use it to improve stability.");
  };

  render() {
    if (this.state.hasError) {
      const isDark = getIsDark();
      const t = isDark ? darkTokens : lightTokens;

      return (
        <View style={[styles.container, { backgroundColor: t.bg }]}>
          <LinearGradient colors={t.gradient} style={StyleSheet.absoluteFill} />

          <View style={styles.centerContent}>
            <View style={[styles.iconCircle, { backgroundColor: t.iconBg }]}>
              <AlertCircle size={48} color="#f43f5e" />
            </View>

            <Text style={[styles.title, { color: t.title }]}>Application Error</Text>

            <Text style={[styles.subtitle, { color: t.subtitle }]}>
              Something unexpected happened. We have recorded the error and our team will look into
              it.
            </Text>

            <View style={styles.actions}>
              <Pressable
                onPress={this.handleRestart}
                accessibilityRole="button"
                accessibilityLabel="Restart Application"
                style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed]}
              >
                <RefreshCw size={18} color="#ffffff" />
                <Text style={styles.btnPrimaryText}>Restart Application</Text>
              </Pressable>

              <Pressable
                onPress={this.handleSendReport}
                accessibilityRole="button"
                accessibilityLabel="Send Error Report"
                style={({ pressed }) => [
                  styles.btnOutline,
                  { borderColor: t.border, backgroundColor: t.surface },
                  pressed && styles.btnPressed,
                ]}
              >
                <Text style={styles.btnOutlineText}>Send Error Report</Text>
              </Pressable>
            </View>

            <TouchableOpacity
              onPress={() => this.setState({ showDetails: !this.state.showDetails })}
              style={styles.detailsToggle}
              accessibilityRole="button"
              accessibilityLabel="Toggle technical details"
            >
              <Text style={[styles.detailsLabel, { color: t.muted }]}>Technical details</Text>
              <View style={this.state.showDetails ? styles.chevronOpen : styles.chevronClosed}>
                <ChevronRight size={14} color={t.muted} />
              </View>
            </TouchableOpacity>

            {this.state.showDetails && (
              <View
                style={[
                  styles.detailsCard,
                  { backgroundColor: t.detailsBg, borderColor: t.detailsBorder },
                ]}
              >
                <ScrollView style={styles.detailsScroll}>
                  <Text style={styles.detailsError}>
                    {this.state.error?.name}: {this.state.error?.message}
                  </Text>
                  <Text style={[styles.detailsStack, { color: t.muted }]}>
                    {this.state.error?.stack}
                  </Text>
                </ScrollView>
              </View>
            )}
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: t.footerText }]}>
              {this.state.reportReference
                ? `Reference: ${this.state.reportReference}`
                : "Preparing reference..."}
            </Text>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const lightTokens = {
  bg: "#ffffff",
  gradient: ["#ffffff", "#f8fafc"] as [string, string],
  surface: "#ffffff",
  title: "#020617",
  subtitle: "#64748b",
  border: "#e2e8f0",
  muted: "#94a3b8",
  iconBg: "#fff1f2",
  detailsBg: "#f8fafc",
  detailsBorder: "#f1f5f9",
  footerText: "#cbd5e1",
};

const darkTokens = {
  bg: "#020617",
  gradient: ["#020617", "#0f172a"] as [string, string],
  surface: "#0f172a",
  title: "#f8fafc",
  subtitle: "#94a3b8",
  border: "#1e293b",
  muted: "#64748b",
  iconBg: "#450a0a",
  detailsBg: "#0f172a",
  detailsBorder: "#1e293b",
  footerText: "#475569",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 40,
    maxWidth: 340,
  },
  actions: {
    width: "100%",
    maxWidth: 400,
    gap: 16,
  },
  btnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#6366f1",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  btnPrimaryText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  btnOutline: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  btnOutlineText: {
    color: "#6366f1",
    fontSize: 16,
    fontWeight: "600",
  },
  btnPressed: {
    opacity: 0.88,
  },
  detailsToggle: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 24,
  },
  detailsLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  chevronClosed: {
    marginLeft: 4,
  },
  chevronOpen: {
    marginLeft: 4,
    transform: [{ rotate: "90deg" }],
  },
  detailsCard: {
    marginTop: 8,
    width: "100%",
    maxWidth: 400,
    maxHeight: 192,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  detailsScroll: {
    maxHeight: 168,
  },
  detailsError: {
    fontFamily: "Menlo",
    fontSize: 12,
    color: "#e11d48",
  },
  detailsStack: {
    fontFamily: "Menlo",
    fontSize: 10,
    lineHeight: 16,
    marginTop: 8,
  },
  footer: {
    paddingBottom: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
  },
});
