import { rf } from '@/utils/responsive';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const categorias = [
  { name: 'Alimentação', icon: 'food' },
  { name: 'Transporte', icon: 'bus' },
  { name: 'Saúde', icon: 'medkit' },
  { name: 'Lazer', icon: 'gamepad-variant' },
  { name: 'Educação', icon: 'school' },
];

export default function NovoGasto() {
  const router = useRouter();
  const { theme } = useTheme();

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]); // padrão hoje

  const handleSalvar = () => {
    if (!descricao || !valor || !categoria) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    // Aqui você faria integração com backend ou state
    Alert.alert('Sucesso', 'Gasto registrado com sucesso!');
    router.back(); // volta para a tela anterior
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        showsVerticalScrollIndicator={false}
      >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Novo Gasto</Text>
        <View style={{ width: 24 }} /> {/* espaço para alinhamento */}
      </View>

      {/* FORMULÁRIO */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.label, { color: theme.text }]}>Descrição</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
          placeholder="Ex: Supermercado"
          placeholderTextColor={theme.subText}
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={[styles.label, { color: theme.text }]}>Valor</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
          placeholder="Ex: 5000"
          placeholderTextColor={theme.subText}
          value={valor}
          onChangeText={setValor}
          keyboardType="numeric"
        />

        <Text style={[styles.label, { color: theme.text }]}>Categoria</Text>
        <View style={styles.categoriasContainer}>
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat.name}
              style={[
                styles.categoriaBtn,
                {
                  backgroundColor:
                    categoria === cat.name ? theme.primary : theme.card,
                },
              ]}
              onPress={() => setCategoria(cat.name)}
            >
              <MaterialCommunityIcons
                name={cat.icon}
                size={24}
                color={categoria === cat.name ? '#FFF' : theme.text}
              />
              <Text
                style={{
                  color: categoria === cat.name ? '#FFF' : theme.text,
                  marginTop: 4,
                  fontSize: 12,
                  fontWeight: '600',
                }}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.label, { color: theme.text }]}>Data</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
          value={data}
          onChangeText={setData}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={theme.subText}
        />

        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: theme.primary }]}
          onPress={handleSalvar}
        >
          <Text style={styles.saveText}>Salvar Gasto</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    marginBottom: 24,
  },

  title: {
    fontSize: rf(20),
    fontWeight: '700',
  },

  card: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 24,
  },

  label: {
    fontSize: rf(14),
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: rf(16),
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  categoriasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  categoriaBtn: {
    width: (width - 80) / 3, // 3 botões por linha
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  saveBtn: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
  },

  saveText: {
    color: '#FFF',
    fontSize: rf(16),
    fontWeight: '700',
  },
});
