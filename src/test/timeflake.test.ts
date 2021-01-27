import { Timeflake, MAX_TIMEFLAKE, MAX_RANDOM, MAX_TIMESTAMP } from '../timeflake'
import * as Timeflake4Js from '../index'
import { timer } from '../utils'
import BN from 'bn.js'

describe('testing timeflake', () => {

    test('random() test', () => {
        const getTime = timer()
        const now = getTime()
        for (let i = 0; i < 1000; i++) {
            const flake = Timeflake4Js.random()
            expect(flake instanceof Timeflake).toBeTruthy()
            const rand = flake.random
            const timestamp = flake.timestamp
            expect(rand instanceof BN).toBeTruthy()
            expect(timestamp instanceof BN).toBeTruthy()
            expect(flake.int.gten(0) && flake.int.lte(MAX_TIMEFLAKE)).toBeTruthy()
            expect(now.lte(timestamp))
            expect(rand.gten(0) && rand.lte(MAX_RANDOM))
            expect(timestamp.gten(0) && timestamp.lte(MAX_TIMESTAMP))
        }
    })

    test('test from values, timestamp only', () => {
        const now = new BN(123)
        for (let i = 0; i < 1000; i++) {
            const flake = Timeflake4Js.from_values(now)
            expect(flake instanceof Timeflake).toBeTruthy()
            const rand = flake.random
            const timestamp = flake.timestamp
            expect(rand instanceof BN).toBeTruthy()
            expect(timestamp instanceof BN).toBeTruthy()
            expect(flake.int.gten(0) && flake.int.lte(MAX_TIMEFLAKE)).toBeTruthy()
            expect(rand.gten(0) && rand.lte(MAX_RANDOM))
            expect(now.eq(flake.timestamp)).toBeTruthy()
        }
    })

    test('test from values, timestamp and random', () => {
        const now = new BN(123)
        const rand = new BN(456)
        for (let i = 0; i < 1000; i++) {
            const flake = Timeflake4Js.from_values(now, rand)
            expect(flake instanceof Timeflake).toBeTruthy()
            expect(flake.random instanceof BN).toBeTruthy()
            expect(flake.timestamp instanceof BN).toBeTruthy()
            expect(flake.int.gten(0) && flake.int.lte(MAX_TIMEFLAKE)).toBeTruthy()
            expect(flake.timestamp.eq(now)).toBeTruthy()
            expect(flake.random.eq(rand)).toBeTruthy()
        }
    })

    test('testing base62 parsing and conversion', () => {
        const flake = Timeflake4Js.parse({
            type: 'base62',
            value: '02i1KoFfY3auBS745gImbZ'
        })
        expect(flake instanceof Timeflake).toBeTruthy()
        expect(flake.random instanceof BN).toBeTruthy()
        expect(flake.timestamp instanceof BN).toBeTruthy()
        expect(flake.timestamp.eq(new BN(1579091935216))).toBeTruthy()
        expect(flake.random.eq(new BN('724773312193627487660233'))).toBeTruthy()
        expect(flake.hex).toEqual('016fa936bff0997a0a3c428548fee8c9')
        expect(flake.base62).toBe('02i1KoFfY3auBS745gImbZ')
        // expect(flake.bytes) // TODO: add bytes buffer test
        expect(flake.uuid).toBe('016fa936-bff0-997a-0a3c-428548fee8c9')
    })

    test('testing bytes parsing and conversion', () => {
        const bytes = [
            // b"\x01o\xa96\xbf\xf0\x99z\n<B\x85H\xfe\xe8\xc9"
            1, 111, 169, 54, 191, 240, 153, 122, 10, 60, 66,
            133, 72, 254, 232, 201
        ]
        const flake = Timeflake4Js.parse({
            type: 'bytes',
            value: new Uint8Array(bytes)
        })
        expect(flake instanceof Timeflake).toBeTruthy()
        expect(flake.random instanceof BN).toBeTruthy()
        expect(flake.timestamp instanceof BN).toBeTruthy()
        expect(flake.timestamp.eq(new BN(1579091935216))).toBeTruthy()
        expect(flake.random.eq(new BN('724773312193627487660233'))).toBeTruthy()
        expect(flake.hex).toEqual('016fa936bff0997a0a3c428548fee8c9')
        expect(flake.base62).toBe('02i1KoFfY3auBS745gImbZ')
        // expect(flake.bytes) // TODO: add bytes buffer test
        expect(flake.uuid).toBe('016fa936-bff0-997a-0a3c-428548fee8c9')
    })

    test('testing int parsing and conversion', () => {
        const integer = new BN('1909005012028578488143182045514754249')
        const flake = Timeflake4Js.parse({
            type: 'BN',
            value: integer
        })
        expect(flake instanceof Timeflake).toBeTruthy()
        expect(flake.random instanceof BN).toBeTruthy()
        expect(flake.timestamp instanceof BN).toBeTruthy()
        expect(flake.timestamp.eq(new BN(1579091935216))).toBeTruthy()
        expect(flake.random.eq(new BN('724773312193627487660233'))).toBeTruthy()
        expect(flake.hex).toEqual('016fa936bff0997a0a3c428548fee8c9')
        expect(flake.base62).toBe('02i1KoFfY3auBS745gImbZ')
        // expect(flake.bytes) // TODO: add bytes buffer test
        expect(flake.uuid).toBe('016fa936-bff0-997a-0a3c-428548fee8c9')
    })

    test('test timestamp increment', async () => {
        const flake1 = Timeflake4Js.random()
        await new Promise(r => setTimeout(r, 500))
        const flake2 = Timeflake4Js.random()
        await new Promise(r => setTimeout(r, 1200))
        const flake3 = Timeflake4Js.random()

        expect(flake1.timestamp.lt(flake2.timestamp)).toBeTruthy()
        expect(flake2.timestamp.lt(flake3.timestamp)).toBeTruthy()
        expect(flake1).not.toBe(flake2)
        expect(flake2).not.toBe(flake3)
        expect(flake1).not.toBe(flake3)
    })
})