import { RFValue } from 'react-native-responsive-fontsize';

/**
 * Retorna um tamanho de fonte responsivo
 * @param baseSize - Tamanho base da fonte (ex: 16)
 * @returns Tamanho de fonte ajustado para a tela
 */
export const rf = (baseSize: number) => RFValue(baseSize);
