import { getDateDifference } from '../getDateDifference';

describe('getDateDifference', () => {
  it('should return 2', () => {
    const dateDifference = getDateDifference(
      new Date('2022-02-23'),
      new Date('2022-02-27'),
    );
    expect(dateDifference).toEqual(4);
  });

  it('should return 0', () => {
    const dateDifference = getDateDifference(
      new Date('2022-02-23'),
      new Date('2022-02-23'),
    );
    expect(dateDifference).toEqual(0);
  });
});
