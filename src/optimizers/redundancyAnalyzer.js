/**
 * Analizador de redundancias
 * Detecta y elimina texto repetido o similar
 */

const config = require('../config');

class RedundancyAnalyzer {
  /**
   * Analiza redundancias en un texto
   * @param {string} text - Texto a analizar
   * @returns {object} Análisis de redundancias
   */
  static analyze(text) {
    const sentences = this.getSentences(text);
    const redundancies = [];

    // Comparar cada oración con las demás
    for (let i = 0; i < sentences.length; i++) {
      for (let j = i + 1; j < sentences.length; j++) {
        const similarity = this.calculateSimilarity(
          sentences[i],
          sentences[j]
        );

        if (similarity > config.redundancyThreshold) {
          redundancies.push({
            sentence1: sentences[i],
            sentence2: sentences[j],
            similarity: similarity.toFixed(2),
            index1: i,
            index2: j
          });
        }
      }
    }

    return {
      totalSentences: sentences.length,
      redundanciesFound: redundancies.length,
      details: redundancies
    };
  }

  /**
   * Extrae oraciones del texto
   * @param {string} text - Texto
   * @returns {string[]} Array de oraciones
   */
  static getSentences(text) {
    return text
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }

  /**
   * Calcula similitud entre dos textos (0-1)
   * Usa Jaccard similarity
   * @param {string} text1 - Primer texto
   * @param {string} text2 - Segundo texto
   * @returns {number} Similitud (0-1)
   */
  static calculateSimilarity(text1, text2) {
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));

    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);

    if (union.size === 0) return 0;
    return intersection.size / union.size;
  }

  /**
   * Elimina redundancias manteniéndose la oración más clara
   * @param {string} text - Texto con redundancias
   * @returns {string} Texto optimizado
   */
  static removeRedundancies(text) {
    const analysis = this.analyze(text);
    let optimized = text;

    // Ordenar redundancias por índice (de mayor a menor) para eliminar sin afectar índices
    analysis.details
      .sort((a, b) => Math.max(b.index1, b.index2) - Math.max(a.index1, a.index2))
      .forEach(redundancy => {
        // Eliminar la oración más corta o menos informativa
        const len1 = redundancy.sentence1.length;
        const len2 = redundancy.sentence2.length;
        const toRemove = len1 <= len2 ? redundancy.sentence1 : redundancy.sentence2;
        optimized = optimized.replace(toRemove + '.', '');
      });

    return optimized.trim();
  }
}

module.exports = RedundancyAnalyzer;
