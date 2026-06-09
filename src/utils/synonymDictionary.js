/**
 * Diccionario de sinónimos más cortos
 * Mapea palabras largas a sus equivalentes más concisos
 */

const synonymDictionary = {
  // Verbos
  'proporcionar': 'dar',
  'necesitar': 'precisar',
  'considerar': 'ver',
  'demostrar': 'mostrar',
  'determinar': 'ver',
  'establecer': 'fijar',
  'implementar': 'hacer',
  'obtener': 'sacar',
  'analizar': 'ver',
  'verificar': 'chequear',
  'asegurar': 'asegure',
  'garantizar': 'garante',
  'examinar': 'mirar',
  'evaluar': 'ver',
  'información': 'datos',
  'comprender': 'entender',
  'organizar': 'ordenar',
  'desarrollar': 'hacer',

  // Adjetivos
  'importante': 'clave',
  'significativo': 'clave',
  'particular': 'especial',
  'específico': 'dado',
  'adicional': 'extra',
  'complementario': 'extra',
  'fundamental': 'clave',
  'esencial': 'vital',
  'apropiado': 'apto',
  'correcto': 'ok',
  'incorrecto': 'malo',
  'diferente': 'distinto',
  'disponible': 'listo',
  'requerido': 'obligatorio',
  'necesario': 'preciso',

  // Adverbios
  'actualmente': 'hoy',
  'generalmente': 'usualmente',
  'prácticamente': 'casi',
  'principalmente': 'sobre todo',
  'finalmente': 'al fin',
  'posteriormente': 'luego',
  'anteriormente': 'antes',
  'simultáneamente': 'a la vez',
  'concretamente': 'así',

  // Sustantivos
  'descripción': 'desc',
  'documentación': 'docs',
  'implementación': 'impl',
  'configuración': 'config',
  'aplicación': 'app',
  'herramienta': 'tool',
  'utilidad': 'util',
  'ejemplo': 'ej',
  'referencia': 'ref',
  'resultado': 'res',
  'estructura': 'estruct',
  'objetivo': 'meta',
  'propósito': 'fin'
};

class SynonymDictionary {
  /**
   * Obtiene sinónimo más corto de una palabra
   * @param {string} word - Palabra a buscar
   * @returns {string|null} Sinónimo o null
   */
  static getShorterSynonym(word) {
    const lowerWord = word.toLowerCase();
    return synonymDictionary[lowerWord] || null;
  }

  /**
   * Verifica si una palabra tiene sinónimo más corto
   * @param {string} word - Palabra a verificar
   * @returns {boolean}
   */
  static hasShorterSynonym(word) {
    return this.getShorterSynonym(word) !== null;
  }

  /**
   * Calcula el ahorro de caracteres
   * @param {string} original - Palabra original
   * @param {string} synonym - Sinónimo
   * @returns {number} Diferencia de caracteres
   */
  static calculateCharSaving(original, synonym) {
    return original.length - synonym.length;
  }
}

module.exports = SynonymDictionary;
