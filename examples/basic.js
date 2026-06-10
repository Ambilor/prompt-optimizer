const PromptOptimizer = require('../src/index');

// Create an optimizer instance
const optimizer = new PromptOptimizer({
  language: 'es',
  aggressiveness: 'medium'
});

// Example 1: Simple optimization
console.log('=== EJEMPLO 1: Optimización Básica ===\n');

const prompt1 = "Hola, necesito que me ayudes a escribir un código en JavaScript que sea una función que haga muchas cosas diferentes";

const result1 = optimizer.optimize(prompt1);

console.log('Original:', result1.original);
console.log('Optimized:', result1.optimized);
console.log('Tokens ahorrados:', result1.tokensSaved);
console.log('Porcentaje:', result1.percentageSaved + '%');
console.log('Sugerencias:');
result1.suggestions.forEach(s => console.log('  ' + s));
console.log('\n');

// Example 2: Detailed analysis
console.log('=== EJEMPLO 2: Análisis Detallado ===\n');

const prompt2 = "Escribe una función JavaScript que valide correos electrónicos";

const analysis = optimizer.analyze(prompt2);

console.log('Token count:', analysis.tokenCount);
console.log('Readability:', analysis.readability + '/10');
console.log('Redundancy:', (analysis.redundancy * 100).toFixed(2) + '%');
console.log('Complexity:', (analysis.complexity * 100).toFixed(2) + '%');
console.log('Keywords:', analysis.keywords.join(', '));
console.log('\n');

// Example 3: Compare aggressiveness levels
console.log('=== EJEMPLO 3: Comparación de Niveles ===\n');

const testPrompt = "Por favor, necesito que me ayudes a crear una función que haga varias cosas diferentes en JavaScript, básicamente validar datos, procesar información y mostrar resultados";

const levels = ['low', 'medium', 'high'];

levels.forEach(level => {
  optimizer.setAggressiveness(level);
  const result = optimizer.optimize(testPrompt);
  console.log(`Aggressiveness: ${level}`);
  console.log(`  Tokens guardados: ${result.tokensSaved}`);
  console.log(`  Mejora: ${result.percentageSaved}%`);
  console.log('');
});

// Example 4: Batch processing
console.log('=== EJEMPLO 4: Procesamiento en Batch ===\n');

const prompts = [
  "Hola, necesito ayuda para escribir código",
  "Por favor, crea una función de validación",
  "Escribe un programa que resuelva esto"
];

optimizer.setAggressiveness('medium');
const stats = optimizer.getStats(prompts);

console.log('Total prompts:', stats.totalPrompts);
console.log('Total tokens originales:', stats.totalOriginalTokens);
console.log('Total tokens optimizados:', stats.totalOptimizedTokens);
console.log('Total ahorrado:', stats.totalSaved);
console.log('Mejora promedio:', stats.averageImprovement + '%');
console.log('\n');

// Example 5: Token counting
console.log('=== EJEMPLO 5: Conteo de Tokens ===\n');

const sentence = "Este es un ejemplo de oración para contar tokens";
const tokenCount = optimizer.countTokens(sentence);

console.log('Frase:', sentence);
console.log('Tokens:', tokenCount);
console.log('\n');

// Example 6: Configuration
console.log('=== EJEMPLO 6: Configuración ===\n');

const config = optimizer.getConfig();
console.log('Configuración actual:');
console.log(JSON.stringify(config, null, 2));
