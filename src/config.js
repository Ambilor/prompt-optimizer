// Configuración global del optimizador

module.exports = {
  // Palabras que pueden ser eliminadas sin afectar significado
  unnecesaryWords: [
    'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
    'es', 'son', 'está', 'están', 'estoy', 'estamos',
    'que', 'de', 'y', 'o', 'en', 'a', 'ante', 'por',
    'por favor', 'gracias', 'porfavor',
    'realmente', 'muy', 'bastante', 'más o menos',
    'creo que', 'parece que', 'tal vez', 'quizá'
  ],

  // Contextos donde las palabras NO deben ser eliminadas
  protectedContexts: [
    'importante', 'crítico', 'must', 'must-have', 'required',
    'esencial', 'necesario', 'obligatorio'
  ],

  // Umbral mínimo de similitud para detectar redundancias (0-1)
  redundancyThreshold: 0.75,

  // Máximo porcentaje de reducción permitido sin perder calidad
  maxReductionPercent: 40,

  // Habilitar logs detallados
  verbose: false
};
