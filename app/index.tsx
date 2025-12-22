/* eslint-disable import/no-unresolved */
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'Controle Seu Dinheiro',
    text: 'Acompanhe receitas, despesas e saldo em tempo real',
    icon: 'wallet-outline',
  },
  {
    title: 'Organize Seus Gastos',
    text: 'Classifique suas despesas e veja relatórios detalhados',
    icon: 'bar-chart-outline',
  },
  {
    title: 'Alcance Seus Objetivos',
    text: 'Defina metas de economia e acompanhe seu progresso',
    icon: 'trophy-outline',
  },
];

export default function Intro() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  // Mascote animado
  const translateY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -15,
          duration: 1200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, []);

  // Slide animado
  const slideAnim = useRef(new Animated.Value(width)).current;
  useEffect(() => {
    slideAnim.setValue(width);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [index]);

  async function playClick() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/click.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.log('Erro ao tocar som:', error);
    }
  }

  function next() {
    playClick();
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      router.replace('../auth/login');
    }
  }

  const slide = slides[index];

  return (
    <LinearGradient
      colors={['#4C6EF5', '#3B5BDB']}
      style={styles.container}
    >
      {/* Mascote animado */}
      <Animated.View style={[styles.mascot, { transform: [{ translateY }] }]}>
        <MaterialCommunityIcons
          name="robot-happy"
          size={110}
          color="#FFD166"
        />
      </Animated.View>

      {/* Slide animado em card */}
      <Animated.View style={[styles.card, { transform: [{ translateX: slideAnim }] }]}>
        <LinearGradient
          colors={['#FFD166', '#FFB347']}
          style={styles.iconBackground}
        >
          <Ionicons name={slide.icon as any} size={50} color="#FFF" />
        </LinearGradient>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.text}>{slide.text}</Text>
      </Animated.View>

      {/* Indicadores */}
      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === index && styles.dotActive]}
          />
        ))}
      </View>

      {/* Botão */}
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
    padding: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mascot: {
    marginTop: 60,
  },
  card: {
    width: width * 0.8,
    backgroundColor: '#ffffff20',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    color: '#EDEDED',
    textAlign: 'center',
    marginTop: 10,
  },
  dots: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C7C7C7',
    marginHorizontal: 6,
  },
  dotActive: {
    backgroundColor: '#FFD166',
    width: 14,
  },
  button: {
    backgroundColor: '#FFD166',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
