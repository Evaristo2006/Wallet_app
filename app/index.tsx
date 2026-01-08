/* eslint-disable import/no-unresolved */
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'Controle seu dinheiro',
    text: 'Acompanhe receitas, despesas e saldo em tempo real',
    icon: 'account-balance-wallet',
  },
  {
    title: 'Organize seus gastos',
    text: 'Visualize categorias e relatórios claros',
    icon: 'bar-chart',
  },
  {
    title: 'Alcance seus objetivos',
    text: 'Crie metas financeiras e acompanhe o progresso',
    icon: 'emoji-events',
  },
];

export default function Intro() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  // Animação leve (mascote)
  const floatAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  function next() {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      router.replace('/auth/login');
    }
  }

  const slide = slides[index];

  return (
    <LinearGradient
      colors={['#4C6EF5', '#3B5BDB']}
      style={styles.container}
    >
      {/* MASCOTE / IDENTIDADE */}
      <Animated.View
        style={[styles.mascot, { transform: [{ translateY: floatAnim }] }]}
      >
        <MaterialIcons
          name="account-balance-wallet"
          size={96}
          color="#FFD166"
        />
      </Animated.View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <MaterialIcons
            name={slide.icon as any}
            size={40}
            color="#3B5BDB"
          />
        </View>

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.text}>{slide.text}</Text>
      </View>

      {/* INDICADORES */}
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === index && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* BOTÃO */}
      <TouchableOpacity style={styles.button} onPress={next}>
        <Text style={styles.buttonText}>
          {index === slides.length - 1 ? 'Começar' : 'Próximo'}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },

  mascot: {
    marginTop: 80,
    alignItems: 'center',
  },

  content: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  iconCircle: {
    backgroundColor: '#FFD166',
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  text: {
    fontSize: 15,
    color: '#E5E7EB',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 6,
  },

  dotActive: {
    backgroundColor: '#FFD166',
    width: 16,
  },

  button: {
    backgroundColor: '#FFD166',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1F2937',
  },
});
