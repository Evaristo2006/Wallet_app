import { rf } from '@/utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import { Stack, usePathname, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function RootLayoutWithMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();

  // Não mostrar menu na tela de intro/login
  const hideMenuRoutes = ['/', '/auth/login', '/auth/registro', '/index'];
  const shouldShowMenu = !hideMenuRoutes.includes(pathname);

  // Tabs para footer
  const tabs = [
    { name: 'home', label: 'Home', icon: 'home', route: '/home/homescren' },
    { name: 'gasto', label: 'Gasto', icon: 'remove-circle-outline', route: '/home/mout' },
    { name: 'grafico', label: 'Gráfico', icon: 'bar-chart', route: '/graficos' },
    { name: 'config', label: 'Config', icon: 'settings', route: '/settings' },
  ];

  const getCurrentTab = () => {
    if (pathname === '/home/homescren') return 'home';
    if (pathname === '/home/mout') return 'gasto';
    if (pathname === '/graficos') return 'grafico';
    if (pathname === '/settings') return 'config';
    return '';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ flex: 1 }}>
        {shouldShowMenu && (
          <View style={[styles.header, { backgroundColor: theme.header, borderBottomColor: theme.border }]}>
            <Text style={[styles.headerTitle, { color: theme.headerText }]}>Kwanza+</Text>
            <View style={{ width: 28 }} />
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>

        {shouldShowMenu && (
          <View style={[styles.footer, { backgroundColor: theme.footer, borderTopColor: theme.border }]}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.name}
                style={styles.tabItem}
                onPress={() => router.push(tab.route as any)}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={24}
                  color={getCurrentTab() === tab.name ? theme.footerActive : theme.footerText}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: getCurrentTab() === tab.name ? theme.footerActive : theme.footerText,
                      fontWeight: getCurrentTab() === tab.name ? '700' : '500',
                    },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutWithMenu />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: rf(18), fontWeight: 'bold' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  tabLabel: { fontSize: rf(10), marginTop: 4, textAlign: 'center' },
});
