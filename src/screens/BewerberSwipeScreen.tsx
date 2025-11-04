/**
 * BewerberSwipeScreen
 * Screen für Bewerber - zeigt Job Cards
 * Nutzt SwipeService für Daten, Components für UI
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text } from '../components/ui';
import { SwipeHeader } from '../components/swipe/SwipeHeader';
import { JobCardContent } from '../components/swipe/SwipeCard/JobCardContent';
import { SwipeActions } from '../components/swipe/SwipeActions';
import LoadingIndicator from '../components/common/LoadingIndicator';
import { swipeService, JobCard } from '../services/swipe';
import { colors, spacing } from '../theme';

export const BewerberSwipeScreen: React.FC = () => {
  const [jobCards, setJobCards] = useState<JobCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [swiping, setSwiping] = useState(false);

  // Load Job Cards on mount
  useEffect(() => {
    loadJobCards();
  }, []);

  const loadJobCards = async () => {
    try {
      setLoading(true);
      const cards = await swipeService.getJobCards();
      setJobCards(cards);
    } catch (error) {
      console.error('[BewerberSwipeScreen] Error loading cards:', error);
      Alert.alert('Fehler', 'Jobs konnten nicht geladen werden.');
    } finally {
      setLoading(false);
    }
  };

  const handleDislike = async () => {
    if (swiping || currentIndex >= jobCards.length) return;

    setSwiping(true);
    const currentCard = jobCards[currentIndex];

    try {
      await swipeService.handleSwipe(currentCard.id, 'left');
      setCurrentIndex(currentIndex + 1);
    } catch (error) {
      console.error('[BewerberSwipeScreen] Error swiping:', error);
    } finally {
      setSwiping(false);
    }
  };

  const handleLike = async () => {
    if (swiping || currentIndex >= jobCards.length) return;

    setSwiping(true);
    const currentCard = jobCards[currentIndex];

    try {
      const result = await swipeService.handleSwipe(currentCard.id, 'right');
      
      if (result.isMatch) {
        Alert.alert('🎉 Match!', 'Das Unternehmen hat dich auch geliked!');
      }
      
      setCurrentIndex(currentIndex + 1);
    } catch (error) {
      console.error('[BewerberSwipeScreen] Error swiping:', error);
    } finally {
      setSwiping(false);
    }
  };

  const handleMenuPress = () => {
    // TODO: Open Drawer/Menu
    Alert.alert('Menu', 'Menu noch nicht implementiert');
  };

  // Loading State
  if (loading) {
    return (
      <View style={styles.container}>
        <SwipeHeader onMenuPress={handleMenuPress} />
        <View style={styles.centerContainer}>
          <LoadingIndicator />
        </View>
      </View>
    );
  }

  // No more cards
  if (currentIndex >= jobCards.length) {
    return (
      <View style={styles.container}>
        <SwipeHeader onMenuPress={handleMenuPress} />
        <View style={styles.centerContainer}>
          <Text variant="title2" textAlign="center">
            🎉 Keine weiteren Jobs
          </Text>
          <Text variant="body" color="secondary" style={styles.emptyText}>
            Schau später nochmal vorbei!
          </Text>
        </View>
      </View>
    );
  }

  // Render current card
  const currentCard = jobCards[currentIndex];

  return (
    <View style={styles.container}>
      {/* Header */}
      <SwipeHeader onMenuPress={handleMenuPress} />

      {/* Card Stack */}
      <View style={styles.cardContainer}>
        <JobCardContent job={currentCard} />
      </View>

      {/* Actions */}
      <SwipeActions
        onDislike={handleDislike}
        onLike={handleLike}
        disabled={swiping}
      />

      {/* Card Counter */}
      <View style={styles.counterContainer}>
        <Text variant="caption1" color="tertiary">
          {currentIndex + 1} / {jobCards.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  emptyText: {
    marginTop: spacing.md,
  },
  counterContainer: {
    alignItems: 'center',
    paddingBottom: spacing.md,
  },
});
