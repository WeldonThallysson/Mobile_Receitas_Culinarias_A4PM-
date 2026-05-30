import { formatCPF, parseCPFOrEmail } from './character';

describe('character formatter', () => {
  it('formats CPF progressively as the user types numbers', () => {
    expect(formatCPF('1')).toBe('1');
    expect(formatCPF('12')).toBe('12');
    expect(formatCPF('123')).toBe('123');
    expect(formatCPF('1234')).toBe('123.4');
    expect(formatCPF('12345')).toBe('123.45');
    expect(formatCPF('123456')).toBe('123.456');
    expect(formatCPF('1234567')).toBe('123.456.7');
    expect(formatCPF('123456789')).toBe('123.456.789');
    expect(formatCPF('1234567890')).toBe('123.456.789-0');
    expect(formatCPF('12345678901')).toBe('123.456.789-01');
  });

  it('formats text as CPF when input contains only numbers', () => {
    expect(parseCPFOrEmail('12345678901')).toBe('123.456.789-01');
  });

  it('returns email text unchanged when input includes letters or special characters', () => {
    expect(parseCPFOrEmail('user@example.com')).toBe('user@example.com');
    expect(parseCPFOrEmail('123abc')).toBe('123abc');
  });
});
