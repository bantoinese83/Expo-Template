import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "./theme/colors";
import textStyles, { iosShadow } from "./theme/styles";
import { moderateScale, verticalScale, horizontalScale } from "./utils/responsive/metrices";
import AppHeader from "./src/components/AppHeader";
import PrimaryButton from "./src/components/common/PrimaryButton";

const FeatureCard = ({ icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <View style={styles.card}>
    <View style={styles.cardIcon}>
      <MaterialCommunityIcons name={icon} size={24} color={colors.primary} />
    </View>
    <Text style={[textStyles.textSemibold16, { color: colors.textDark, marginTop: 12 }]}>{title}</Text>
    <Text style={[textStyles.textRegular12, { color: colors.textSecondary, marginTop: 4 }]}>
      {desc}
    </Text>
  </View>
);

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <AppHeader
        userName="Developer"
        userImage="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
        greeting="Welcome to"
        onNotificationPress={() => {}}
        notificationCount={3}
        headerStyle={{ backgroundColor: colors.white }}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={[textStyles.textBold24, styles.heroTitle]}>
            The Ultimate Expo{"\n"}
            <Text style={{ color: colors.primary }}>TypeScript Template</Text>
          </Text>
          <Text style={[textStyles.textRegular14, styles.heroSubtitle]}>
            Enterprise-ready foundation with strict typing, clean architecture, and modern styling.
          </Text>
          <PrimaryButton
            title="Get Started"
            onPress={() => alert("Let's build something amazing!")}
            style={styles.heroButton}
          />
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[textStyles.textBold18, { color: colors.primary }]}>0</Text>
            <Text style={[textStyles.textRegular11, { color: colors.textSecondary }]}>
              Type Errors
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[textStyles.textBold18, { color: colors.secondary }]}>100%</Text>
            <Text style={[textStyles.textRegular11, { color: colors.textSecondary }]}>
              Strict Mode
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[textStyles.textBold18, { color: colors.sky }]}>v2.0</Text>
            <Text style={[textStyles.textRegular11, { color: colors.textSecondary }]}>
              Stability
            </Text>
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.sectionHeader}>
          <Text style={textStyles.textSemibold18}>Core Features</Text>
          <TouchableOpacity>
            <Text style={[textStyles.textMedium13, { color: colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          <FeatureCard
            icon="shield-check"
            title="Type Safety"
            desc="Strictly typed props and state across all components."
          />
          <FeatureCard
            icon="layers-outline"
            title="Clean Architecture"
            desc="Separation of concerns using hooks and services."
          />
          <FeatureCard
            icon="palette-outline"
            title="Dynamic Theme"
            desc="Centralized design system for rapid UI development."
          />
          <FeatureCard
            icon="rocket-launch-outline"
            title="Performance"
            desc="Optimized rendering and optimized asset loading."
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[textStyles.textRegular12, { color: colors.textLightGray }]}>
            Made with ❤️ by
          </Text>
          <Text style={[textStyles.textSemibold14, { color: colors.textDark, marginTop: 4 }]}>
            Monarch Labs
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingBottom: verticalScale(40),
  },
  hero: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(32),
    alignItems: "center",
  },
  heroTitle: {
    textAlign: "center",
    lineHeight: 34,
  },
  heroSubtitle: {
    textAlign: "center",
    color: colors.textSecondary,
    marginTop: verticalScale(16),
    lineHeight: 22,
    paddingHorizontal: horizontalScale(10),
  },
  heroButton: {
    marginTop: verticalScale(24),
    width: "60%",
    height: moderateScale(48),
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: colors.primaryLight + "40",
    marginHorizontal: horizontalScale(24),
    borderRadius: moderateScale(16),
    paddingVertical: verticalScale(16),
    alignItems: "center",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: "60%",
    backgroundColor: colors.lightGray,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: horizontalScale(24),
    marginTop: verticalScale(32),
    marginBottom: verticalScale(16),
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: horizontalScale(16),
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    backgroundColor: colors.white,
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: colors.border,
    ...iosShadow,
  },
  cardIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(10),
    backgroundColor: colors.primary + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    marginTop: verticalScale(40),
    alignItems: "center",
  },
});
