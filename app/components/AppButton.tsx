import { Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
};

export default function AppButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4f46e5',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
