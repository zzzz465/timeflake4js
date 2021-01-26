import { Timeflake, MAX_TIMEFLAKE, MAX_RANDOM, MAX_TIMESTAMP } from '../timeflake'
import * as Timeflake4Js from '../index'
import { timer } from '../utils'

describe('testing timeflake', () => {

    test('random() test', () => {
        const getTime = timer()
        const now = getTime()
        for (let i = 0; i < 1000; i++) {
            const flake = Timeflake4Js.random()
            expect(flake instanceof Timeflake).toBeTruthy()
            const rand = flake.random
            const timestamp = flake.timestamp
            expect(typeof rand === 'number').toBeTruthy()
            expect(typeof timestamp === 'number').toBeTruthy()
            expect(0 <= flake.int && flake.int <= MAX_TIMEFLAKE).toBeTruthy()
            expect(now <= timestamp)
            expect(0 <= rand && rand <= MAX_RANDOM)
            expect(0 <= timestamp && timestamp <= MAX_TIMESTAMP)
        }
    })
})