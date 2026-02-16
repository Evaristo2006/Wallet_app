import { rf } from "@/utils/responsive";
import { Ionicons } from "@expo/vector-icons";
import { Slot, usePathname, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // animação do menu lateral
  const slideAnim = useRef(new Animated.Value(-width * 0.7)).current;

  const toggleMenu = () => {
    if (menuOpen) {
      Animated.timing(slideAnim, {
        toValue: -width * 0.7,
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
  // dentro do Layout()

// Função para mapear rota → título
const getTitle = (path: string) => {
  switch (path) {
    case "/homescren":
      return "Home";
    case "/progresso1":
      return "Criar Campanha";
    case "/Updates":
      return "Updates";
    case "/ativity":
      return "Activity";
    
    default:
      return "App"; // fallback
  }
};


  // telas que devem mostrar o footer
  const mainTabs = ["/homescren", "/progresso1", "/Updates", "/ativity", "/profile"];
  const showFooter = mainTabs.includes(pathname);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header fixo */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="menu" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{getTitle(pathname)}</Text>

        </View>

        {/* Tela atual (ocupa todo o espaço disponível) */}
        <View style={styles.screenContainer}>
          <Slot />
        </View>

        {/* Bottom Nav só nas telas principais */}
        {showFooter && (
          <SafeAreaView edges={["bottom"]} style={styles.bottomSafe}>
            <View style={styles.bottomNav}>
              <NavItem
                icon="home-outline"
                label="Home"
                active={pathname === "/homescren"}
                onPress={() => router.push("/homescren")}
              />
               <NavItem
                 icon="compass-outline"
                 label="Criar Campanha"
                active={pathname.startsWith("/progresso")}
                onPress={() => router.push("/progresso1")}
             />
 
              <NavItem
                icon="person-outline"
                label="Perfil"
                active={pathname === "/profile"}
                onPress={() => router.push("/profile")}
              />
            </View>
          </SafeAreaView>
        )}

        {/* Overlay para fechar ao clicar fora */}
        {menuOpen && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={toggleMenu}
          />
        )}

        {/* Menu lateral */}
        <Animated.View style={[styles.sideMenu, { left: slideAnim }]}>
          <Text style={styles.menuTitle}>Menu</Text>

          <TouchableOpacity onPress={() => router.push("/homescren")}>
            <Text
              style={[styles.menuItem, pathname === "/homescren" && styles.activeMenuItem]}
            >
              🏠 Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/progresso1")}>
            <Text
              style={[
                styles.menuItem,
                pathname === "/progresso1" && styles.activeMenuItem,
              ]}
            >
              🧭 Criar Campanha
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/profile")}>
            <Text
              style={[
                styles.menuItem,
                pathname === "/profile" && styles.activeMenuItem,
              ]}
            >
              👤 Perfil
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text
              style={[
                styles.menuItem,
                pathname === "/login" && styles.activeMenuItem,
              ]}
            >
              🔐 Sair
            </Text>
          </TouchableOpacity>
      
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

interface NavItemProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  active?: boolean;
  onPress?: () => void;
}

function NavItem({ icon, label, active = false, onPress }: NavItemProps) {
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
      <Ionicons name={icon} size={24} color={active ? "#00AEEF" : "#888"} />
      <Text style={[styles.navLabel, active && { color: "#00AEEF" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  activeMenuItem: {
    color: "#00AEEF",
    fontWeight: "bold",
  },
  headerTitle: { fontSize: rf(18), fontWeight: "bold", marginLeft: 10 },
  screenContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  bottomSafe: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: height * 0.012,
    backgroundColor: "#fff",
  },
  navItem: { alignItems: "center" },
  navLabel: { fontSize: rf(12), color: "#888", marginTop: 2 },
  sideMenu: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width * 0.7,
    backgroundColor: "#fff",
    padding: 20,
    elevation: 5,
    zIndex: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 10,
  },
  menuTitle: { fontSize: rf(20), fontWeight: "bold", marginBottom: 20 },
  menuItem: { fontSize: rf(16), marginVertical: 10 },
});
