import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback } from 'react';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form';
import { AUTH_NAV_SCREENS } from '@/navigation/NavigationConstants';
import { AuthStackNavigationProps } from '@/navigation/AuthNavigator';
import { ScreenWrapper, ControlledTextInput } from '@/components';
import { useTranslation } from '@/hooks/useTranslation';
import { SignInFormData, useSignInForm } from '@/hooks/form/useSignInForm';

export type SigninProps = AuthStackNavigationProps<AUTH_NAV_SCREENS.SIGNIN>;

export default function Signin({ navigation, route }: SigninProps) {
  const { t } = useTranslation();

  const form = useSignInForm({
    email: route.params?.email || '',
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = form;

  const onSubmit: SubmitHandler<SignInFormData> = useCallback(
    async (data: SignInFormData) => {
      console.log('Form Submit:', data);
    },
    [],
  );
  const onError: SubmitErrorHandler<SignInFormData> = useCallback(
    formErrors => {
      console.log('Form Errors:', formErrors);
    },
    [],
  );

  const email = watch('email');

  return (
    <ScreenWrapper headerTitle={t('auth.signIn')} keyboardAvoiding>
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
          />
          <ControlledTextInput
            control={control}
            name="password"
            label={t('auth.password')}
            placeholder={t('auth.passwordPlaceholder')}
            isPassword
            required
          />

          <View style={styles.buttonContainer}>
            <Button
              title={isSubmitting ? 'Signing in...' : t('auth.signIn')}
              onPress={handleSubmit(onSubmit, onError)}
              disabled={isSubmitting}
            />
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(AUTH_NAV_SCREENS.SIGNUP, { email })
            }
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
