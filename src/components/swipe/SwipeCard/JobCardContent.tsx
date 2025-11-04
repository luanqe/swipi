/**
 * JobCard Component
 * Spezialisierte Card für Job-Anzeigen (für Bewerber)
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '../../ui';
import { SwipeCard } from './index';
import { JobCard as JobCardType } from '../../../services/swipe';
import { colors, spacing, typography } from '../../../theme';

interface JobCardContentProps {
  job: JobCardType;
}

export const JobCardContent: React.FC<JobCardContentProps> = ({ job }) => {
  return (
    <SwipeCard>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header mit Company Logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>{job.companyLogo || '🏢'}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text variant="title3" style={styles.companyName}>
              {job.companyName}
            </Text>
            <Text variant="body" color="tertiary">
              {job.location}
            </Text>
          </View>
        </View>

        {/* Job Title */}
        <View style={styles.section}>
          <Text variant="title1" style={styles.jobTitle}>
            {job.jobTitle}
          </Text>
        </View>

        {/* Salary & Type */}
        <View style={styles.infoRow}>
          {job.salary && (
            <View style={styles.infoBadge}>
              <Text variant="body">
                💰 {job.salary}
              </Text>
            </View>
          )}
          <View style={styles.infoBadge}>
            <Text variant="body">
              ⏰ {job.employmentType}
            </Text>
          </View>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text variant="bodyEmphasized" style={styles.sectionTitle}>
            Geforderte Skills
          </Text>
          <View style={styles.skillsContainer}>
            {job.requiredSkills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text variant="caption1" color="accent">
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text variant="bodyEmphasized" style={styles.sectionTitle}>
            Beschreibung
          </Text>
          <Text variant="body" color="secondary">
            {job.description}
          </Text>
        </View>

        {/* Benefits */}
        {job.benefits && job.benefits.length > 0 && (
          <View style={styles.section}>
            <Text variant="bodyEmphasized" style={styles.sectionTitle}>
              Benefits
            </Text>
            {job.benefits.map((benefit, index) => (
              <Text key={index} variant="body" color="secondary" style={styles.benefitItem}>
                ✓ {benefit}
              </Text>
            ))}
          </View>
        )}

        {/* Spacer für Bottom Buttons */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SwipeCard>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background.secondary,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  logo: {
    fontSize: 32,
  },
  headerInfo: {
    flex: 1,
  },
  companyName: {
    marginBottom: spacing.xs,
  },
  section: {
    padding: spacing.lg,
  },
  jobTitle: {
    color: colors.neutral[900],
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    color: colors.neutral[800],
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  infoBadge: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  skillBadge: {
    backgroundColor: colors.primary[500] + '15', // 15% opacity
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary[500] + '30',
  },
  benefitItem: {
    marginTop: spacing.xs,
  },
  bottomSpacer: {
    height: spacing.xl * 3, // Platz für Action Buttons
  },
});
