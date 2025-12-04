import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useGlobalLoading } from '@/hooks/useGlobalLoading';
import Header from './Header';
import { Neutrals } from '@/theme/style';
import { isTablet, wp } from '@/utils/responsive';

interface ScreenWrapperProps {
  children: React.ReactNode;
  headerTitle?: string;
  showHeader?: boolean;
  showBackButton?: boolean;
  headerRight?: React.ReactNode;
  scrollable?: boolean;
  backgroundColor?: string;
  onBackPress?: () => void;
  loading?: boolean;
  keyboardAvoiding?: boolean;
  statusBarStyle?: 'dark-content' | 'light-content';
  maxWidth?: number; // Max width for iPad content
  centerContent?: boolean; // Center content on iPad
}

export default function ScreenWrapper({
  children,
  headerTitle,
  showHeader = true,
  showBackButton = false,
  headerRight,
  scrollable = false,
  backgroundColor = Neutrals.white,
  onBackPress,
  loading = false,
  keyboardAvoiding = false,
  statusBarStyle = 'dark-content',
  maxWidth = 768,
  centerContent = true,
}: ScreenWrapperProps) {
  const navigation = useNavigation();
  const tablet = isTablet();
  const contentWidth =
    tablet && centerContent ? Math.min(maxWidth, wp(85)) : '100%';

  // Use React Query's global loading state
  const isGlobalLoading = useGlobalLoading();

  // Combine prop loading with global loading
  const isLoading = loading || isGlobalLoading;

  // Default back button behavior
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Neutrals.grape} />
        </View>
      );
    }

    const contentContainer =
      tablet && centerContent ? styles.centeredContent : undefined;

    if (scrollable) {
      return (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, contentContainer]}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.innerContent, { width: contentWidth }]}>
            {children}
          </View>
        </ScrollView>
      );
    }

    return (
      <View style={[styles.content, contentContainer]}>
        <View style={[styles.innerContent, { width: contentWidth }]}>
          {children}
        </View>
      </View>
    );
  };

  const content = (
    <View style={[styles.container, { backgroundColor }]}>
      {showHeader && (
        <Header
          title={headerTitle}
          showBackButton={showBackButton}
          rightComponent={headerRight}
          onBackPress={handleBackPress}
        />
      )}
      {renderContent()}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle={statusBarStyle} />
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Neutrals.white,
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  centeredContent: {
    alignItems: 'center',
  },
  innerContent: {
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
