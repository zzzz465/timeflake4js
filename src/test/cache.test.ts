import { Timeflake, MAX_TIMEFLAKE } from '../timeflake'
import { from_values, parse, random } from '../index'
import BN from 'bn.js'

// https://github.com/zzzz465/timeflake4js/issues/1
describe('timeflake cache test', () => {
    // contributor: TomFoyster
    test('run from_values test', () => {
        const now = new BN(123)
        const rand = new BN(456)

        const flake = from_values(now, rand)

        expect(flake instanceof Timeflake).toBeTruthy()
        expect(flake.random instanceof BN).toBeTruthy()
        expect(flake.timestamp instanceof BN).toBeTruthy()
        expect(flake.int.gten(0) && flake.int.lte(MAX_TIMEFLAKE)).toBeTruthy()
        expect(flake.timestamp.eq(now)).toBeTruthy()
        expect(flake.hex).toBe('00000000007b000000000000000001c8');
        expect(flake.random.eq(rand)).toBeTruthy()
    })

    // // contributor: TomFoyster
    test('this second test should pass', () => {
        const now = new BN(1345893)
        const rand = new BN(20222928)

        const flake = from_values(now, rand)
        
        expect(flake instanceof Timeflake).toBeTruthy()
        expect(flake.random instanceof BN).toBeTruthy()
        expect(flake.timestamp instanceof BN).toBeTruthy()
        expect(flake.int.gten(0) && flake.int.lte(MAX_TIMEFLAKE)).toBeTruthy()
        expect(flake.timestamp.eq(now)).toBeTruthy()
        expect(flake.random.eq(rand)).toBeTruthy()
        expect(flake.hex).toEqual('000000148965000000000000013493d0')
        expect(flake.base62).toBe('00000Y85nGBYEc5kdvHhOi')
        expect(flake.uuid).toBe('00000014-8965-0000-0000-0000013493d0')
    })

    test('from_values should return new instance', () => {
        const flake1 = from_values(new BN(123), new BN(456))
        
        const flake2 = from_values(new BN(987), new BN(654))

        expect(flake1.hex).not.toBe(flake2.hex)
    })
})
