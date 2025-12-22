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
          <Text style={styles.greeting}>Olá, Firmino</Text>
          <Text style={styles.month}>Agosto 2025</Text>
        </View>

        <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
      </View>

      {/* SALDO */}
      <View style={styles.card}>
        <Text style={styles.label}>Saldo atual</Text>
        <Text style={styles.balance}>AOA 1.250.000</Text>

        <View style={styles.row}>
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

      {/* META */}
      <Text style={styles.sectionTitle}>Meta em progresso</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Comprar Laptop</Text>
        <Text style={styles.subText}>AOA 350.000 / 500.000</Text>

        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      {/* AÇÕES RÁPIDAS */}
      <Text style={styles.sectionTitle}>Ações rápidas</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push('../gastos')}
        >
          <MaterialCommunityIcons
            name="cash-minus"
            size={26}
            color="#E63946"
          />
          <Text style={styles.actionText}>Novo gasto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push('../metas')}
        >
          <Ionicons
            name="trophy-outline"
            size={26}
            color="#F4C430"
          />
          <Text style={styles.actionText}>Nova meta</Text>
        </TouchableOpacity>
      </View>

      {/* ÚLTIMAS TRANSAÇÕES */}
      <Text style={styles.sectionTitle}>Últimas movimentações</Text>

      <View style={styles.card}>
        <Transaction title="Supermercado" value="- 12.500" expense />
        <Transaction title="Salário" value="+ 250.000" />
        <Transaction title="Transporte" value="- 3.000" expense />
      </View>
    </ScrollView>
  );
}

/* COMPONENTE AUXILIAR */
function Transaction({ title, value, expense }) {
  return (
    <View style={styles.transaction}>
      <Text style={styles.transactionTitle}>{title}</Text>
      <Text
        style={[
          styles.transactionValue,
          { color: expense ? '#E63946' : '#2ECC71' },
        ]}
      >
        {value}
      </Text>
    </View>
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
    marginBottom: 24,
  },

  greeting: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },

  month: {
    color: '#BFC9D9',
    fontSize: 14,
  },

  card: {
    backgroundColor: '#1C2541',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },

  label: {
    color: '#BFC9D9',
    fontSize: 14,
  },

  balance: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  income: {
    color: '#2ECC71',
  },

  incomeValue: {
    color: '#2ECC71',
    fontWeight: 'bold',
  },

  expense: {
    color: '#E63946',
  },

  expenseValue: {
    color: '#E63946',
    fontWeight: 'bold',
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  subText: {
    color: '#BFC9D9',
    marginVertical: 4,
  },

  progressBar: {
    height: 8,
    backgroundColor: '#3A506B',
    borderRadius: 10,
    marginTop: 8,
    overflow: 'hidden',
  },

  progressFill: {
    width: '70%',
    height: '100%',
    backgroundColor: '#F4C430',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  actionBtn: {
    width: width / 2 - 30,
    backgroundColor: '#1C2541',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },

  actionText: {
    color: '#FFFFFF',
    marginTop: 8,
    fontSize: 14,
  },

  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  transactionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
  },

  transactionValue: {
    fontWeight: 'bold',
  },
});
