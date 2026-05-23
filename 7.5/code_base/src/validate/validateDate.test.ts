import { validateDate } from './validateDate';
import { errors } from '../utils/dictionarty';

describe('validateDate', () => {
  it('пропускает дату в виде ДД.ММ.ГГГГ', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const day = String(futureDate.getDate()).padStart(2, '0');
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const year = futureDate.getFullYear();
    const validDateString = `${day}.${month}.${year}`;

    const result = validateDate(validDateString);
    expect(result.isValid).toBe(true);
    expect(result.message).toBe(errors.date.valid);
  });

  it('не пропускает спецсимволы', () => {
    const result = validateDate('12.0#.2025');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(errors.date.invalidCharacters);
  });

  it('не пропускает буквенные значения', () => {
    const result = validateDate('12.MM.2025');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(errors.date.invalidCharacters);
  });

  it('выдаёт предупреждение, если дата раньше текущей', () => {
    const result = validateDate('01.01.2000');
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(errors.date.past);
  });
});
