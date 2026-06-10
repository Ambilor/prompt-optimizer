const PromptOptimizer = require('../src/index');

describe('PromptOptimizer', () => {
  let optimizer;

  beforeEach(() => {
    optimizer = new PromptOptimizer({ language: 'es' });
  });

  describe('optimize', () => {
    test('should optimize a prompt', () => {
      const prompt = "Hola, necesito que me ayudes a escribir código";
      const result = optimizer.optimize(prompt);

      expect(result).toHaveProperty('original');
      expect(result).toHaveProperty('optimized');
      expect(result).toHaveProperty('tokensSaved');
      expect(result).toHaveProperty('percentageSaved');
      expect(result.optimized).toBeTruthy();
    });

    test('should save tokens', () => {
      const prompt = "Por favor, necesito que me ayudes a escribir un código en JavaScript";
      const result = optimizer.optimize(prompt);

      expect(result.tokensSaved).toBeGreaterThan(0);
      expect(result.optimizedTokens).toBeLessThan(result.originalTokens);
    });

    test('should throw error for invalid input', () => {
      expect(() => optimizer.optimize('')).toThrow();
      expect(() => optimizer.optimize(null)).toThrow();
      expect(() => optimizer.optimize(123)).toThrow();
    });
  });

  describe('analyze', () => {
    test('should analyze a prompt', () => {
      const prompt = "Escribe una función de validación";
      const analysis = optimizer.analyze(prompt);

      expect(analysis).toHaveProperty('tokenCount');
      expect(analysis).toHaveProperty('readability');
      expect(analysis).toHaveProperty('redundancy');
      expect(analysis).toHaveProperty('keywords');
    });

    test('should have valid readability score', () => {
      const prompt = "Escribe código";
      const analysis = optimizer.analyze(prompt);

      expect(analysis.readability).toBeGreaterThanOrEqual(0);
      expect(analysis.readability).toBeLessThanOrEqual(10);
    });

    test('should have valid redundancy score', () => {
      const prompt = "Escribe código para escribir";
      const analysis = optimizer.analyze(prompt);

      expect(analysis.redundancy).toBeGreaterThanOrEqual(0);
      expect(analysis.redundancy).toBeLessThanOrEqual(1);
    });
  });

  describe('countTokens', () => {
    test('should count tokens', () => {
      const prompt = "Escribe código";
      const count = optimizer.countTokens(prompt);

      expect(count).toBeGreaterThan(0);
      expect(typeof count).toBe('number');
    });

    test('should throw error for invalid input', () => {
      expect(() => optimizer.countTokens('')).toThrow();
      expect(() => optimizer.countTokens(null)).toThrow();
    });
  });

  describe('optimizeBatch', () => {
    test('should optimize multiple prompts', () => {
      const prompts = [
        "Hola, ayuda",
        "Por favor, escribe",
        "Necesito código"
      ];

      const results = optimizer.optimizeBatch(prompts);

      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(prompts.length);
      expect(results[0]).toHaveProperty('optimized');
    });

    test('should throw error for non-array input', () => {
      expect(() => optimizer.optimizeBatch('not an array')).toThrow();
    });
  });

  describe('getStats', () => {
    test('should get batch statistics', () => {
      const prompts = [
        "Hola, necesito ayuda",
        "Por favor, escribe código"
      ];

      const stats = optimizer.getStats(prompts);

      expect(stats).toHaveProperty('totalPrompts');
      expect(stats).toHaveProperty('totalSaved');
      expect(stats).toHaveProperty('averageImprovement');
      expect(stats.totalPrompts).toBe(prompts.length);
    });
  });

  describe('aggressiveness', () => {
    test('should set aggressiveness', () => {
      optimizer.setAggressiveness('high');
      const config = optimizer.getConfig();

      expect(config.aggressiveness).toBe('high');
    });

    test('should throw error for invalid aggressiveness', () => {
      expect(() => optimizer.setAggressiveness('invalid')).toThrow();
    });

    test('should have different results for different aggressiveness', () => {
      const prompt = "Por favor, necesito que me ayudes a escribir código JavaScript para validar";

      optimizer.setAggressiveness('low');
      const lowResult = optimizer.optimize(prompt);

      optimizer.setAggressiveness('high');
      const highResult = optimizer.optimize(prompt);

      expect(lowResult.tokensSaved).toBeLessThanOrEqual(highResult.tokensSaved);
    });
  });

  describe('configuration', () => {
    test('should get configuration', () => {
      const config = optimizer.getConfig();

      expect(config).toHaveProperty('model');
      expect(config).toHaveProperty('aggressiveness');
      expect(config).toHaveProperty('language');
    });

    test('should preserve initial options', () => {
      const opts = { language: 'en', aggressiveness: 'high' };
      const opt = new PromptOptimizer(opts);
      const config = opt.getConfig();

      expect(config.language).toBe('en');
      expect(config.aggressiveness).toBe('high');
    });
  });
});
