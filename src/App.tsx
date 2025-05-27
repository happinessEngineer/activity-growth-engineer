import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "./components/Button";
import { Headline, BodyText } from "./components/Typography";
import { containerStyles } from "./components/styles";
import { getFlag } from "./utils/featureFlags";

/**
 * Main App component that renders the paywall screen.
 * This component displays different copy based on the user's variant (A/B test),
 * tracks user interactions, and handles the purchase flow.
 */
export default function App(): React.ReactElement {
  const showHeadlineB = getFlag("paywall_copy_b");

  return (
    <SafeAreaView style={containerStyles.container}>
      <StatusBar style="auto" />
      <Headline>
        {showHeadlineB ? "Unlock AI Study Mode" : "Upgrade your study plan"}
      </Headline>
      <BodyText>1 200+ flashcards • adaptive quizzes • offline access</BodyText>
      <Button onPress={() => console.log("Upgrade")} label="Upgrade" />
    </SafeAreaView>
  );
} 