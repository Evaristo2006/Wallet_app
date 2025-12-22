import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, Firmino 👋</Text>
          <Text style={styles.month}>Agosto 2025</Text>
        </View>

        <Ionicons name="notifications-outline" size={26} color="#fff" />
      </View>

      {/* CARD SALDO */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Saldo Atual</Text>
        <Text style={styles.balanceValue}>AOA 1.250.000</Text>

        <View style={styles.balanceRow}>
          <View>
            <Text style={styles.income}>Entradas</Text>
            <Text style={styles.incomeValue}>+ 800.000</Text>
          </View>

          <View>
            <Text style={styles.expense}>Saídas</Text>
            <Text style={styles.expenseValue}>- 550.000</Text>
          </View>
        </View>
      </View>

      {/* METAS */}
      <Text style={styles.sectionTitle}>🎯 Metas Financeiras</Text>

      <View style={styles.goalCard}>
        <Text style={styles.goalTitle}>Comprar Laptop</Text>
        <Text style={styles.goalValue}>AOA 350.000 / 500.000</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      {/* AÇÕES RÁPIDAS */}
      <Text style={styles.sectionTitle}>⚡ Ações rápidas</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('../gastos')}>
          <MaterialCommunityIcons name="cash-minus" size={28} color="#FF6B6B" />
          <Text style={styles.actionText}>Adicionar Gasto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('../metas')}>
          <Ionicons name="trophy-outline" size={28} color="#FFD93D" />
          <Text style={styles.actionText}>Nova Meta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B132B',
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  greeting: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  month: {
    color: '#BFC9D9',
    fontSize: 14,
  },

  balanceCard: {
    backgroundColor: '#1C2541',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },

  balanceLabel: {
    color: '#BFC9D9',
    fontSize: 14,
  },

  balanceValue: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  income: {
    color: '#6BCB77',
  },

  incomeValue: {
    color: '#6BCB77',
    fontWeight: 'bold',
  },

  expense: {
    color: '#FF6B6B',
  },

  expenseValue: {
    color: '#FF6B6B',
    fontWeight: 'bold',
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  goalCard: {
    backgroundColor: '#1C2541',
    borderRadius: 16,
    padding: 16,
    marginBottom: 25,
  },

  goalTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  goalValue: {
    color: '#BFC9D9',
    marginVertical: 6,
  },

  progressBar: {
    height: 8,
    backgroundColor: '#3A506B',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    width: '70%',
    height: '100%',
    backgroundColor: '#FFD93D',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  actionBtn: {
    width: width / 2 - 30,
    backgroundColor: '#1C2541',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  actionText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
});
