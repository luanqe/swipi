import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/theme';
import { useRole } from '@/context/RoleContext';
import DynamicForm from '@/components/forms/DynamicForm';
import { getOnboardingSteps, getTotalSteps } from '@/config/onboarding';

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
          <Text style={styles.errorText}>
            Keine Onboarding-Steps für Rolle: {role}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={
          isDark 
            ? ['#18191A', '#242526'] 
            : ['#F7F8FA', '#FFFFFF']
        }
        style={StyleSheet.absoluteFillObject}
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
            
            {/* Top Section - Header + Form */}
            <View style={styles.topSection}>
              {/* Back Button */}
              {currentStepIndex > 0 && (
                <TouchableOpacity 
                  style={styles.backButton}
                  onPress={handleBack}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Zurück"
                >
                  <Text style={[styles.backButtonText, isDark && styles.textDark]}>
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
                        isDark && styles.progressDotDark,
                        index <= currentStepIndex && isDark && styles.progressDotActiveDark,
                      ]}
                    />
                  ))}
                </View>
                <Text style={[styles.progressText, isDark && styles.textSecondaryDark]}>
                  Schritt {currentStepIndex + 1} von {totalSteps}
                </Text>
              </View>

              {/* Header */}
              <View style={styles.header}>
                <Text style={[styles.headline, isDark && styles.textDark]}>
                  {currentStep.title}
                </Text>
                {currentStep.subtitle && (
                  <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
                    {currentStep.subtitle}
                  </Text>
                )}
              </View>

              {/* Dynamic Form for current step */}
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

// ============================================================================
// STYLES
// ============================================================================

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
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: Platform.OS === 'ios' ? theme.spacing.lg : theme.spacing.xl,
  },
  
  // Top Section (Header + Form)
  topSection: {
    paddingTop: theme.spacing.lg,
  },

  // Back Button
  backButton: {
    marginBottom: theme.spacing.md,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    ...theme.typography.body,
    color: theme.colors.primary[500],
    fontWeight: '600',
  },

  // Progress Indicator
  progressContainer: {
    marginBottom: theme.spacing.xxl,
  },
  progressBar: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  progressDot: {
    flex: 1,
    height: 4,
    backgroundColor: theme.colors.neutral[300],
    borderRadius: 2,
  },
  progressDotActive: {
    backgroundColor: theme.colors.primary[500],
  },
  progressDotDark: {
    backgroundColor: theme.darkColors.neutral[400],
  },
  progressDotActiveDark: {
    backgroundColor: theme.colors.primary[500],
  },
  progressText: {
    ...theme.typography.caption1,
    color: theme.colors.neutral[700],
    textAlign: 'center',
  },
  
  // Header
  header: {
    marginBottom: theme.spacing.xl,
  },
  headline: {
    ...theme.typography.largeTitle,
    color: theme.colors.neutral[900],
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body,
    color: theme.colors.neutral[700],
  },
  subtitleDark: {
    color: theme.darkColors.neutral[700],
  },

  // Error State
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.error,
    textAlign: 'center',
  },

  // Dark Mode
  textDark: {
    color: theme.darkColors.neutral[900],
  },
  textSecondaryDark: {
    color: theme.darkColors.neutral[700],
  },
});
