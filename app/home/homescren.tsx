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
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: theme.text }]}>
            Olá, Firmino
          </Text>
          <Text style={[styles.month, { color: theme.subText }]}>
            Agosto 2025
          </Text>
        </View>

        <Ionicons
          name="notifications-outline"
          size={24}
          color={theme.text}
        />
      </View>

      {/* SALDO */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.label, { color: theme.subText }]}>
          Saldo atual
        </Text>

        <Text style={[styles.balance, { color: theme.text }]}>
          AOA 1.250.000
        </Text>

        <View style={styles.row}>
          <View>
            <Text style={{ color: theme.income }}>Entradas</Text>
            <Text style={[styles.incomeValue, { color: theme.income }]}>
              + 800.000
            </Text>
          </View>

          <View>
            <Text style={{ color: theme.expense }}>Saídas</Text>
            <Text style={[styles.expenseValue, { color: theme.expense }]}>
              - 550.000
            </Text>
          </View>
        </View>
      </View>

      {/* META */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Meta em progresso
      </Text>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>
          Comprar Laptop
        </Text>

        <Text style={[styles.subText, { color: theme.subText }]}>
          AOA 350.000 / 500.000
        </Text>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { backgroundColor: theme.primary },
            ]}
          />
        </View>
      </View>

      {/* AÇÕES RÁPIDAS */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Ações rápidas
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: theme.card }]}
          onPress={() => router.push('/home/mout')}
        >
          <MaterialCommunityIcons
            name="cash-minus"
            size={26}
            color={theme.expense}
          />
          <Text style={[styles.actionText, { color: theme.text }]}>
            Novo gasto
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: theme.card }]}
          onPress={() => router.push('/home/meta')}
        >
          <Ionicons
            name="trophy-outline"
            size={26}
            color={theme.primary}
          />
          <Text style={[styles.actionText, { color: theme.text }]}>
            Nova meta
          </Text>
        </TouchableOpacity>
      </View>

      {/* ÚLTIMAS TRANSAÇÕES */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Últimas movimentações
      </Text>

      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Transaction
          title="Supermercado"
          value="- 12.500"
          expense
          theme={theme}
        />
        <Transaction
          title="Salário"
          value="+ 250.000"
          theme={theme} expense={undefined}        />
        <Transaction
          title="Transporte"
          value="- 3.000"
          expense
          theme={theme}
        />
      </View>
    </ScrollView>
  );
}

/* COMPONENTE AUXILIAR */
function Transaction({ title, value, expense, theme }) {
  return (
    <View style={styles.transaction}>
      <Text style={{ color: theme.text }}>{title}</Text>
      <Text
        style={{
          fontWeight: 'bold',
          color: expense ? theme.expense : theme.income,
        }}
      >
        {value}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', // fundo mais claro e suave
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  greeting: {
    color: '#1F2937', // título mais escuro e legível
    fontSize: 24,
    fontWeight: '700',
  },

  month: {
    color: '#6B7280', // subtexto suave
    fontSize: 14,
    marginTop: 2,
  },

  card: {
    backgroundColor: '#FFFFFF', // cards brancos
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, // para Android
  },

  label: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 4,
  },

  balance: {
    color: '#111827',
    fontSize: 32,
    fontWeight: '700',
    marginVertical: 8,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  income: {
    color: '#10B981', // verde moderno
    fontWeight: '600',
  },

  incomeValue: {
    color: '#10B981',
    fontWeight: '700',
    fontSize: 16,
  },

  expense: {
    color: '#EF4444', // vermelho moderno
    fontWeight: '600',
  },

  expenseValue: {
    color: '#EF4444',
    fontWeight: '700',
    fontSize: 16,
  },

  sectionTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },

  cardTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },

  subText: {
    color: '#6B7280',
    marginVertical: 4,
    fontSize: 14,
  },

  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    marginTop: 8,
    overflow: 'hidden',
  },

  progressFill: {
    width: '70%',
    height: '100%',
    backgroundColor: '#3B82F6',
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  actionBtn: {
    width: width / 2 - 30,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  actionText: {
    color: '#111827',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },

  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
});
