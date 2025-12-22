import React, { useState } from 'react'; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
  const [name, setName] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <LinearGradient
      colors={['#4C6EF5', '#3B5BDB']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.innerContainer}
      >
        <Text style={styles.title}>Login</Text>

        {/* Campo Nome */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome de usuário</Text>
          <TextInput
            placeholder="Digite seu nome"
            placeholderTextColor="#EDEDED"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
        </View>

        {/* Campo Senha */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              placeholder="Digite sua senha"
              placeholderTextColor="#EDEDED"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!showPassword}
              style={styles.inputPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão Entrar */}
        <Link href="../home/homescren" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </Link>

        {/* Link para cadastro */}
        <Link href="/auth/registro" asChild>
          <TouchableOpacity>
            <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
          </TouchableOpacity>
        </Link>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD166',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    color: '#EDEDED',
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: '#FFF',
    fontSize: 16,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 16,
    height: 50,
  },
  inputPassword: {
    flex: 1,
    fontSize: 16,
    color: '#FFF',
  },
  button: {
    width: '100%',
    backgroundColor: '#FFD166',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    color: '#EDEDED',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
