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

export default function LoginFinanceiro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <LinearGradient
      colors={['#4C6EF5', '#3B5BDB']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.center}
      >
        {/* CARD */}
        <View style={styles.card}>
          {/* LOGO / TÍTULO */}
          <View style={styles.header}>
            <MaterialIcons name="account-balance-wallet" size={42} color="#FFD166" />
            <Text style={styles.title}>Kwanza+</Text>
            <Text style={styles.subtitle}>
              Controle suas finanças com segurança
            </Text>
          </View>

          {/* EMAIL */}
          <View style={styles.inputWrapper}>
            <MaterialIcons name="email" size={22} color="#FFD166" />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#D1D5DB"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          {/* SENHA */}
          <View style={styles.inputWrapper}>
            <MaterialIcons name="lock" size={22} color="#FFD166" />
            <TextInput
              placeholder="Senha"
              placeholderTextColor="#D1D5DB"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!showPassword}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={22}
                color="#FFD166"
              />
            </TouchableOpacity>
          </View>

          {/* ESQUECEU SENHA */}
          <TouchableOpacity style={styles.forgot}>
            <Text style={styles.forgotText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          {/* BOTÃO */}
          <Link href="/home/homescren" asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </Link>

          {/* REGISTRO */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Não tem conta?</Text>
            <Link href="/auth/registro" asChild>
              <TouchableOpacity>
                <Text style={styles.registerText}> Criar agora</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  card: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 24,
    padding: 28,
  },

  header: {
    alignItems: 'center',
    marginBottom: 32,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFD166',
    marginTop: 8,
  },

  subtitle: {
    fontSize: 14,
    color: '#E5E7EB',
    marginTop: 4,
    textAlign: 'center',
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

  forgot: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },

  forgotText: {
    color: '#E5E7EB',
    fontSize: 14,
  },

  button: {
    backgroundColor: '#FFD166',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F2937',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  footerText: {
    color: '#E5E7EB',
  },

  registerText: {
    color: '#FFD166',
    fontWeight: '700',
  },
});
