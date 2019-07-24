import { MyMonthPipe } from './my-month.pipe';

describe('MyMonthPipe', () => {
  it('create an instance', () => {
    const pipe = new MyMonthPipe();
    expect(pipe).toBeTruthy();
  });
});
