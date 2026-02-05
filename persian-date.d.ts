// src/persian-date.d.ts
declare module 'persian-date' {
    class PersianDate {
      constructor(date?: any);
      format(format: string): string;
      toLocale(locale: string): PersianDate;
      add(amount: number, unit: string): PersianDate;
      subtract(amount: number, unit: string): PersianDate;
      valueOf(): number;
      toGregorian(): Date;
      toString(): string;
      // اگر متدهای دیگری استفاده می‌کنید، اینجا اضافه کنید
    }
    
    export default PersianDate;
  }