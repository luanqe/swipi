/**
 * BewerberCard Component
 * Spezialisierte Card für Bewerber-Profile (für Firmen)
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '../../ui';
import { SwipeCard } from './index';
import { BewerberCard as BewerberCardType } from '../../../services/swipe';
import { colors, spacing } from '../../../theme';

interface BewerberCardContentProps {
  bewerber: BewerberCardType;
}

export const BewerberCardContent: React.FC<BewerberCardContentProps> = ({ bewerber }) => {
  return (
    <SwipeCard>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header mit Profile Image */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Text style={styles.profileImage}>{bewerber.profileImage || '👤'}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text variant="title2">{bewerber.name}</Text>
            {bewerber.title && (
              <Text variant="body" color="secondary" style={styles.title}>
                {bewerber.title}
              </Text>
            )}
            <Text variant="callout" color="tertiary">
              📍 {bewerber.location}
            </Text>
          </View>
        </View>

        {/* Experience & Availability */}
        <View style={styles.infoRow}>
          <View style={styles.infoBadge}>
            <Text variant="body">
              💼 {bewerber.experience}
            </Text>
          </View>
          <View style={[styles.infoBadge, styles.availabilityBadge]}>
            <Text variant="body" color="success">
              ✓ {bewerber.availability}
            </Text>
          </View>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text variant="bodyEmphasized" style={styles.sectionTitle}>
            Skills
          </Text>
          <View style={styles.skillsContainer}>
            {bewerber.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text variant="caption1" color="accent">
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bio */}
        {bewerber.bio && (
          <View style={styles.section}>
            <Text variant="bodyEmphasized" style={styles.sectionTitle}>
              Über mich
            </Text>
            <Text variant="body" color="secondary">
              {bewerber.bio}
            </Text>
          </View>
        )}

        {/* Salary Expectation */}
        {bewerber.desiredSalary && (
          <View style={styles.section}>
            <Text variant="bodyEmphasized" style={styles.sectionTitle}>
              Gehaltsvorstellung
            </Text>
            <Text variant="body" color="secondary">
              💰 {bewerber.desiredSalary}
            </Text>
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
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background.secondary,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 3,
    borderColor: colors.primary[500],
  },
  profileImage: {
    fontSize: 48,
  },
  headerInfo: {
    alignItems: 'center',
  },
  title: {
    marginTop: spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  infoBadge: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  availabilityBadge: {
    backgroundColor: colors.success + '15', // 15% opacity
    borderWidth: 1,
    borderColor: colors.success + '30',
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    color: colors.neutral[800],
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
  bottomSpacer: {
    height: spacing.xl * 3, // Platz für Action Buttons
  },
});
