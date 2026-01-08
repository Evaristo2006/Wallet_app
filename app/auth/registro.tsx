import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

export default function RegistroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <LinearGradient colors={['#4C6EF5', '#3B5BDB']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.center}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Criar Conta</Text>
          <Text style={styles.subtitle}>Comece agora gratuitamente</Text>

          <View style={styles.inputWrapper}>
            <MaterialIcons name="person" size={22} color="#FFD166" />
            <TextInput
              placeholder="Nome"
              placeholderTextColor="#D1D5DB"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
            />
          </View>

          <View style={styles.inputWrapper}>
            <MaterialIcons name="email" size={22} color="#FFD166" />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#D1D5DB"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>

          <View style={styles.inputWrapper}>
            <MaterialIcons name="lock" size={22} color="#FFD166" />
            <TextInput
              placeholder="Senha"
              placeholderTextColor="#D1D5DB"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Criar Conta</Text>
          </TouchableOpacity>

          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text style={styles.link}>
                Já tem conta? Entrar
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1 },

  center: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 24,
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFD166',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 24,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
    marginBottom: 16,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#FFF',
  },

  button: {
    backgroundColor: '#FFD166',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },

  link: {
    textAlign: 'center',
    marginTop: 18,
    color: '#E5E7EB',
    fontWeight: '600',
  },
});
