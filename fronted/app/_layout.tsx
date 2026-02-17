import { rf } from '@/utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import { Stack, usePathname, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const { width } = Dimensions.get('window');

function RootLayoutWithMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.65)).current;

  const toggleMenu = () => {
    if (menuOpen) {
      Animated.timing(slideAnim, {
        toValue: -width * 0.65,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setMenuOpen(false));
    } else {
      setMenuOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.65,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setMenuOpen(false));
  };

  const navigateTo = (route: string) => {
    router.push(route as any);
    closeMenu();
  };

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
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {shouldShowMenu && (
          <View style={[styles.header, { backgroundColor: theme.header, borderBottomColor: theme.border }]}>
            <TouchableOpacity onPress={toggleMenu}>
              <Ionicons name="menu" size={28} color={theme.headerText} />
            </TouchableOpacity>
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

        {menuOpen && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={closeMenu}
          />
        )}

        {shouldShowMenu && (
          <Animated.View style={[styles.sideMenu, { left: slideAnim, backgroundColor: theme.card }]}>
            <View style={[styles.menuHeader, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
              <Text style={[styles.menuTitle, { color: theme.text }]}>💰 Kwanza+</Text>
              <TouchableOpacity onPress={closeMenu}>
                <Ionicons name="close" size={28} color={theme.text} />
              </TouchableOpacity>
            </View>

            <View style={[styles.menuDivider, { backgroundColor: theme.border }]} />

            <TouchableOpacity 
              style={[styles.menuItemContainer, pathname === "/home/homescren" && styles.activeMenuItemContainer]}
              onPress={() => navigateTo("/home/homescren")}
            >
              <Ionicons name="home" size={24} color={pathname === "/home/homescren" ? theme.primary : theme.subText} />
              <Text style={[styles.menuItem, { color: theme.text }, pathname === "/home/homescren" && { color: theme.primary, fontWeight: '700' }]}>
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuItemContainer, pathname === "/home/mout" && styles.activeMenuItemContainer]}
              onPress={() => navigateTo("/home/mout")}
            >
              <Ionicons name="remove-circle-outline" size={24} color={pathname === "/home/mout" ? theme.primary : theme.subText} />
              <Text style={[styles.menuItem, { color: theme.text }, pathname === "/home/mout" && { color: theme.primary, fontWeight: '700' }]}>
                Novo Gasto
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuItemContainer, pathname === "/home/meta" && styles.activeMenuItemContainer]}
              onPress={() => navigateTo("/home/meta")}
            >
              <Ionicons name="trophy" size={24} color={pathname === "/home/meta" ? theme.primary : theme.subText} />
              <Text style={[styles.menuItem, { color: theme.text }, pathname === "/home/meta" && { color: theme.primary, fontWeight: '700' }]}>
                Nova Meta
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuItemContainer, pathname === "/graficos" && styles.activeMenuItemContainer]}
              onPress={() => navigateTo("/graficos")}
            >
              <Ionicons name="bar-chart" size={24} color={pathname === "/graficos" ? theme.primary : theme.subText} />
              <Text style={[styles.menuItem, { color: theme.text }, pathname === "/graficos" && { color: theme.primary, fontWeight: '700' }]}>
                Gráficos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuItemContainer, pathname === "/settings" && styles.activeMenuItemContainer]}
              onPress={() => navigateTo("/settings")}
            >
              <Ionicons name="settings" size={24} color={pathname === "/settings" ? theme.primary : theme.subText} />
              <Text style={[styles.menuItem, { color: theme.text }, pathname === "/settings" && { color: theme.primary, fontWeight: '700' }]}>
                Configurações
              </Text>
            </TouchableOpacity>

            <View style={[styles.menuDivider, { backgroundColor: theme.border }]} />

            <TouchableOpacity 
              style={styles.menuItemContainer}
              onPress={() => navigateTo("/auth/login")}
            >
              <Ionicons name="log-out" size={24} color={theme.expense} />
              <Text style={[styles.menuItem, { color: theme.expense, fontWeight: '600' }]}>
                Sair
              </Text>
            </TouchableOpacity>
          </Animated.View>
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
  sideMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width * 0.65,
    padding: 0,
    elevation: 5,
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  menuTitle: { fontSize: rf(20), fontWeight: 'bold' },
  menuDivider: {
    height: 1,
    marginVertical: 12,
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 0,
  },
  activeMenuItemContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderLeftWidth: 4,
  },
  menuItem: { fontSize: rf(16), marginLeft: 16, fontWeight: '500' },
  activeMenuItem: {
    fontWeight: '700',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 10,
  },
});
