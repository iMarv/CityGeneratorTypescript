import { config } from './config';
import { City } from './City';

describe('City', () => {
    describe('constructor', () => {
        it('should initialize city with default settings on empty constructor', () => {
            const city: City = new City();
            expect(city.width).toBe(config.city.width);
            expect(city.height).toBe(config.city.height);
        });
    });
});
