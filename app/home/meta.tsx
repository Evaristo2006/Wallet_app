import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const categorias = [
  { name: 'Eletrônicos', icon: 'laptop' },
  { name: 'Viagem', icon: 'airplane' },
  { name: 'Educação', icon: 'school' },
  { name: 'Saúde', icon: 'heart-pulse' },
  { name: 'Lazer', icon: 'gamepad-variant' },
];

export default function NovaMeta() {
  const router = useRouter();
  const { theme } = useTheme();

  const [descricao, setDescricao] = useState('');
  const [valorMeta, setValorMeta] = useState('');
  const [categoria, setCategoria] = useState('');
  const [dataAlvo, setDataAlvo] = useState(new Date().toISOString().split('T')[0]); // padrão hoje

  const handleSalvar = () => {
    if (!descricao || !valorMeta) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }
    // Aqui você chamaria a função para salvar no backend ou state
    Alert.alert('Sucesso', 'Meta registrada com sucesso!');
    router.back(); // volta para a tela anterior
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Nova Meta</Text>
        <View style={{ width: 24 }} /> {/* espaço para alinhamento */}
      </View>

      {/* FORMULÁRIO */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.label, { color: theme.text }]}>Descrição da Meta</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
          placeholder="Ex: Comprar Laptop"
          placeholderTextColor={theme.subText}
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={[styles.label, { color: theme.text }]}>Valor da Meta</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
          placeholder="Ex: 500.000"
          placeholderTextColor={theme.subText}
          value={valorMeta}
          onChangeText={setValorMeta}
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

        <Text style={[styles.label, { color: theme.text }]}>Data Alvo</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
          value={dataAlvo}
          onChangeText={setDataAlvo}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={theme.subText}
        />

        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: theme.primary }]}
          onPress={handleSalvar}
        >
          <Text style={styles.saveText}>Salvar Meta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    fontSize: 20,
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
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: '700',
  },
});
