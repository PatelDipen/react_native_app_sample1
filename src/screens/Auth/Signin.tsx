import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';
import { FormProvider, SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { AUTH_NAV_SCREENS } from '@/navigation/NavigationConstants';
import { AuthStackNavigationProps } from '@/navigation/AuthNavigator';
import { ScreenWrapper, ControlledTextInput } from '@/components';
import { useTranslation } from '@/hooks/useTranslation';
import { SignInFormData, useSignInForm } from '@/hooks/form/useSignInForm';
import { useLogin } from '@/hooks/api/useAuth';

export type SigninProps = AuthStackNavigationProps<AUTH_NAV_SCREENS.SIGNIN>;

export default function Signin({ navigation, route }: SigninProps) {
  const { t } = useTranslation();
  const loginMutation = useLogin();

  const form = useSignInForm({
    email: route.params?.email || '',
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = form;

  const onSubmit: SubmitHandler<SignInFormData> = useCallback(
    async (data: SignInFormData) => {
      await loginMutation.mutateAsync({
        userName: data.email,
        password: data.password,
      });
      // Navigation handled automatically by auth state change
      // Errors handled globally by QueryClient
    },
    [loginMutation]
  );

  const onError: SubmitErrorHandler<SignInFormData> = useCallback((formErrors) => {
    console.log('Form Errors:', formErrors);
  }, []);

  const email = watch('email');
  const isLoading = isSubmitting || loginMutation.isPending;

  return (
    <ScreenWrapper headerTitle={t('auth.signIn')} keyboardAware>
      <FormProvider {...form}>
        <View style={styles.container}>
          <ControlledTextInput
            control={control}
            name="email"
            label={t('auth.email')}
            placeholder={t('auth.emailPlaceholder')}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="mail-outline"
            required
            editable={!isLoading}
          />
          <ControlledTextInput
            control={control}
            name="password"
            label={t('auth.password')}
            placeholder={t('auth.passwordPlaceholder')}
            isPassword
            required
            editable={!isLoading}
          />

          <View style={styles.buttonContainer}>
            <Button
              title={isLoading ? t('common.loading') : t('auth.signIn')}
              onPress={handleSubmit(onSubmit, onError)}
              disabled={isLoading}
            />
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate(AUTH_NAV_SCREENS.SIGNUP, { email })}
            disabled={isLoading}
          >
            <Text style={styles.helperText}>
              {t('auth.dontHaveAccount')}
              <Text style={styles.link}> {t('auth.signUp')}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </FormProvider>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  buttonContainer: {
    marginTop: 8,
  },
  helperText: {
    marginTop: 16,
    textAlign: 'center',
  },
  link: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
