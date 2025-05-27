import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "./components/Button";
import { Headline, BodyText } from "./components/Typography";
import { containerStyles } from "./components/styles";
import { useABTest } from "./hooks/useABTest";

/**
 * Main App component that renders the paywall screen.
 * This component displays different copy based on the user's variant (A/B test),
 * tracks user interactions, and handles the purchase flow.
 */

export default function App(): React.ReactElement {
  const { value: headline, trackImpression, trackConversion } = useABTest({
    key: "paywall_copy_b",
    variants: {
      a: "Upgrade your study plan",
      b: "Unlock AI Study Mode"
    },
  });

  useEffect(() => {
    trackImpression();
  }, [trackImpression]);

  return (
    <SafeAreaView style={containerStyles.container}>
      <StatusBar style="auto" />
      <Headline>{headline}</Headline>
      <BodyText>1 200+ flashcards • adaptive quizzes • offline access</BodyText>
      <Button onPress={trackConversion} label="Upgrade" />
    </SafeAreaView>
  );
} 