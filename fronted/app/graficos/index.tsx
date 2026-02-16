import { rf } from '@/utils/responsive';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const categorias = [
  { name: 'Alimentação', color: '#EF4444' },
  { name: 'Transporte', color: '#3B82F6' },
  { name: 'Lazer', color: '#F59E0B' },
  { name: 'Saúde', color: '#10B981' },
  { name: 'Educação', color: '#8B5CF6' },
];

export default function GraficoGastos() {
  const { theme } = useTheme();
  const [periodo, setPeriodo] = useState<'Hoje' | 'Semana' | 'Mês'>('Mês');

  // 🔒 useMemo evita recriação e bugs no chart
  const dataPie = useMemo(
    () =>
      categorias.map((cat) => ({
        name: cat.name,
        amount: Math.floor(Math.random() * 30000 + 5000),
        color: cat.color,
        legendFontColor: '#6B7280', // FIXO para evitar crash no web
        legendFontSize: rf(14),
      })),
    []
  );

  const totalGasto = dataPie.reduce((acc, item) => acc + item.amount, 0);

  const dataBar = {
    labels: ['01', '05', '10', '15', '20', '25', '30'],
    datasets: [
      {
        data: dataPie.map((item) => Math.round(item.amount / 1000)),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: theme.card,
    backgroundGradientFrom: theme.card,
    backgroundGradientTo: theme.card,
    decimalPlaces: 0,
    color: () => theme.primary,
    labelColor: () => theme.text,
    propsForLabels: {
      fontSize: rf(12),
    },
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.background }]}
        showsVerticalScrollIndicator={false}
      >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>
          Gráficos de Gastos
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {/* FILTROS */}
      <View style={styles.filters}>
        {['Hoje', 'Semana', 'Mês'].map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.filterBtn,
              {
                backgroundColor:
                  periodo === p ? theme.primary : theme.card,
              },
            ]}
            onPress={() => setPeriodo(p as any)}
          >
            <Text style={{ color: periodo === p ? '#FFF' : theme.text }}>
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* PIE CHART */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Distribuição por Categoria
        </Text>

        <PieChart
          data={dataPie}
          width={width - 40}
          height={220}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          chartConfig={chartConfig} // 🔴 OBRIGATÓRIO
          absolute
        />
      </View>

      {/* BAR CHART */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Evolução de Gastos ({periodo})
        </Text>

        <BarChart
          data={dataBar}
          width={width - 40}
          height={220}
          fromZero
          chartConfig={chartConfig}
          style={{ borderRadius: 20 }}
        />
      </View>

      {/* RESUMO */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.totalText, { color: theme.text }]}>
          Total gasto: AOA {totalGasto.toLocaleString()}
        </Text>

        {dataPie.map((item) => (
          <View key={item.name} style={styles.row}>
            <View
              style={[
                styles.colorBox,
                { backgroundColor: item.color },
              ]}
            />
            <Text style={[styles.categoryText, { color: theme.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.amountText, { color: theme.text }]}>
              AOA {item.amount.toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  title: { fontSize: rf(20), fontWeight: '700' },

  filters: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-around',
  },

  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  card: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: rf(16),
    fontWeight: '700',
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },

  categoryText: { flex: 1, fontSize: rf(15) },

  amountText: { fontSize: rf(15), fontWeight: '700' },

  totalText: { fontSize: rf(16), fontWeight: '700', marginBottom: 12 },
});
