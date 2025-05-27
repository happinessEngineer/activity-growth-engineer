import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "./components/Button";
import { Headline, BodyText } from "./components/Typography";
import { containerStyles } from "./components/styles";
import { getFlag } from "./utils/featureFlags";
import { track } from "./utils/analytics";
import { EVENTS } from "./constants/analytics";

const HEADLINE_VARIATIONS = {
  a: "Upgrade your study plan",
  b: "Unlock AI Study Mode"
} as const;

/**
 * Main App component that renders the paywall screen.
 * This component displays different copy based on the user's variant (A/B test),
 * tracks user interactions, and handles the purchase flow.
 */

export default function App(): React.ReactElement {
  const showHeadlineB = getFlag("paywall_copy_b");
  const headline = showHeadlineB ? HEADLINE_VARIATIONS.b : HEADLINE_VARIATIONS.a;

  useEffect(() => {
    track(EVENTS.PAYWALL_IMPRESSION, {
      variant: showHeadlineB ? "b" : "a",
      headline,
    });
  }, [showHeadlineB, headline]);

  const handleUpgrade = () => {
    track(EVENTS.PAYWALL_CONVERSION, {
      variant: showHeadlineB ? "b" : "a",
      headline,
    });
    console.log("Upgrade");
  };

  return (
    <SafeAreaView style={containerStyles.container}>
      <StatusBar style="auto" />
      <Headline>{headline}</Headline>
      <BodyText>1 200+ flashcards • adaptive quizzes • offline access</BodyText>
      <Button onPress={handleUpgrade} label="Upgrade" />
    </SafeAreaView>
  );
} 