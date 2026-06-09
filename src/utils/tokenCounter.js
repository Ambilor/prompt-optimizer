/**
 * Utilidad para contar tokens de manera aproximada
 * Basada en la regla general: ~4 caracteres = 1 token
 * Para resultados precisos, usar la API de OpenAI
 */

class TokenCounter {
  /**
   * Cuenta tokens aproximados en un texto
   * @param {string} text - Texto a contar
   * @returns {number} Número aproximado de tokens
   */
  static countTokens(text) {
    if (!text || typeof text !== 'string') return 0;
    
    // Aproximación: 1 token cada ~4 caracteres
    // Más preciso: contar palabras y dividir por 1.3
    const words = text.trim().split(/\s+/).length;
    const chars = text.length;
    
    // Usar la estimación más conservadora
    return Math.ceil(Math.max(words / 1.3, chars / 4));
  }

  /**
   * Calcula el ahorro de tokens
   * @param {number} originalTokens - Tokens originales
   * @param {number} optimizedTokens - Tokens después de optimización
   * @returns {object} Objeto con estadísticas
   */
  static calculateSavings(originalTokens, optimizedTokens) {
    const saved = originalTokens - optimizedTokens;
    const percent = (saved / originalTokens * 100).toFixed(2);
    
    return {
      original: originalTokens,
      optimized: optimizedTokens,
      saved: saved,
      savingsPercent: parseFloat(percent)
    };
  }
}

module.exports = TokenCounter;
