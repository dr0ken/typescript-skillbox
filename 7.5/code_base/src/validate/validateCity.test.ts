import { validateCityName } from './validateCity';
import { errors } from '../utils/dictionarty';

describe('validateCityName', () => {
  it('выдаёт предупреждение, если есть экранирование', () => {
    const result = validateCityName('<script>Paris</script>');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(errors.city.escape);
  });

  it('пропускает название с восклицательным знаком или дефисами', () => {
    const result = validateCityName('Saint-Louis-du-Ha! Ha!');
    expect(result.isValid).toBe(true);
    expect(result.message).toBe(errors.city.valid);
  });

  it('пропускает название со спецсимволами', () => {
    const result = validateCityName('Ağrı');
    expect(result.isValid).toBe(true);
    expect(result.message).toBe(errors.city.valid);
  });

  it('пропускает название из одной буквы', () => {
    const result = validateCityName('A');
    expect(result.isValid).toBe(true);
    expect(result.message).toBe(errors.city.valid);
  });
});
