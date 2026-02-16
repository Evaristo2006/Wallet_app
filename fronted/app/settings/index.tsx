import { rf } from '@/utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>
          Configurações
        </Text>

        <View style={{ width: 24 }} />
      </View>

      {/* OPÇÃO: DARK MODE */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View>
          <Text style={[styles.optionTitle, { color: theme.text }]}>
            Modo escuro
          </Text>
          <Text style={[styles.optionDesc, { color: theme.subText }]}>
            Ativar tema escuro na aplicação
          </Text>
        </View>

        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={isDark ? theme.primary : '#f4f3f4'}
          trackColor={{
            false: '#d1d5db',
            true: theme.primary,
          }}
        />
      </View>
    </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },

  optionDesc: {
    fontSize: rf(13),
    marginTop: 4,
  },
});
