import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui';
import DynamicForm from '@/components/forms/DynamicForm';
import { getOnboardingSteps, getTotalSteps } from '@/config/onboarding';
import { colors, darkColors, spacing, layout } from '@/theme';
import { useRole } from '@/context/RoleContext';

/**
 * Onboarding Data Screen
 * 
 * Multi-Step Onboarding basierend auf Role
 * Config-driven: Liest Steps aus onboarding.ts
 * 
 * Flow:
 * 1. User registriert sich (RegisterScreen)
 * 2. Kommt hier für Data-Collection
 * 3. Durchläuft alle Steps (Name, Skills, etc.)
 * 4. Nach letztem Step → completeOnboarding() → Navigation zu Swipe
 * 
 * MVP: 2-3 Steps je nach Role
 * PRODUCTION: 6+ Steps, dynamisch vom Backend
 */

export default function OnboardingDataScreen({ navigation }: any) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const { role, saveUserData, completeOnboarding } = useRole();
  
  // Get Steps from Config
  const steps = getOnboardingSteps(role);
  const totalSteps = getTotalSteps(role);
  
  // Current Step Index
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];
  
  // Accumulated Form Data
  const [accumulatedData, setAccumulatedData] = useState<Record<string, any>>({});
  
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Animation when step changes
  const animateStepChange = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /**
   * Handle Step Submission
   * Sammelt Daten und geht zum nächsten Step oder beendet Onboarding
   */
  const handleStepSubmit = async (stepData: Record<string, any>) => {
    // Merge step data
    const mergedData = { ...accumulatedData, ...stepData };
    setAccumulatedData(mergedData);
    
    console.log('[OnboardingData] Step completed:', currentStepIndex + 1, '/', totalSteps);
    console.log('[OnboardingData] Data:', stepData);
    
    // Check if last step
    if (currentStepIndex === totalSteps - 1) {
      // Last step → Save all data + complete onboarding
      console.log('[OnboardingData] Onboarding completed! Final data:', mergedData);
      
      await saveUserData(mergedData);
      await completeOnboarding();
      
      // Navigate to Swipe (RoleNavigator will handle the correct stack)
      // TODO: Replace with actual Swipe Screen when created
      console.log('[OnboardingData] TODO: Navigate to SwipeScreen');
      
    } else {
      // Next step
      setCurrentStepIndex(prev => prev + 1);
      animateStepChange();
    }
  };

  /**
   * Handle Back Button
   */
  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      animateStepChange();
    } else {
      navigation.goBack();
    }
  };

  // Safety: If no steps found
  if (!currentStep) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text variant="body" color="error" textAlign="center">
            Keine Onboarding-Steps für Rolle: {role}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const gradientColors = isDark 
    ? [darkColors.background.primary, darkColors.background.secondary] as const
    : [colors.background.secondary, colors.background.primary] as const;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <LinearGradient
        colors={gradientColors}
        style={StyleSheet.absoluteFillObject}
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        {...layout.keyboardAware.withKeyboard}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            
            <View style={styles.header}>
              {/* Back Button */}
              {currentStepIndex > 0 && (
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={handleBack}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Zurück"
                >
                  <Text variant="body" color="primary">
                    ← Zurück
                  </Text>
                </TouchableOpacity>
              )}

              {/* Progress Indicator */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  {Array.from({ length: totalSteps }).map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.progressDot,
                        index <= currentStepIndex && styles.progressDotActive,
                      ]}
                    />
                  ))}
                </View>
                <Text variant="caption1" color="secondary" textAlign="center">
                  Schritt {currentStepIndex + 1} von {totalSteps}
                </Text>
              </View>

              {/* Header */}
              <Text
                variant="largeTitle"
                color="primary"
                style={styles.headline}
              >
                {currentStep.title}
              </Text>
              {currentStep.subtitle && (
                <Text variant="body" color="secondary" style={styles.subtitle}>
                  {currentStep.subtitle}
                </Text>
              )}
            </View>

            <View style={styles.spacer} />

            <View style={styles.footer}>
              <DynamicForm
                fields={currentStep.fields}
                onSubmit={handleStepSubmit}
                submitButtonText={currentStep.buttonText || 'Weiter'}
                initialValues={accumulatedData}
              />
            </View>

          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: layout.screenPadding.horizontal,
  },
  
  // ✅ Zentrale Layout-Zonen
  header: layout.verticalDistribution.header,
  spacer: layout.verticalDistribution.spacer,
  footer: layout.verticalDistribution.footer,
  
  // Screen-spezifische Styles
  backButton: {
    marginBottom: spacing.md,
    alignSelf: 'flex-start',
  },
  progressContainer: {
    marginBottom: spacing.xxl,
  },
  progressBar: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  progressDot: {
    flex: 1,
    height: 4,
    backgroundColor: colors.neutral[300],
    borderRadius: 2,
  },
  progressDotActive: {
    backgroundColor: colors.primary[500],
  },
  headline: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginTop: spacing.sm,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
});
