import BN from "bn.js"
import { randHex } from "../utils"

describe('utility test', () => {
    /*
    test('from_bytes 0x00 0x01 to 1', () => {
        const array = new Uint8Array([parseInt('0x00'), parseInt('0x01')])
        expect(from_bytes(array)).toBe(1)
    })

    test('from_bytes 0xBC614E to 12345678', () => {
        const array = new Uint8Array([parseInt('0xBC'), parseInt('0x61'), parseInt('0x4E')])
        expect(from_bytes(array)).toBe(12345678)
    })
    */

    /*
    test('to_bytes 255 to 0xFF', () => {
        const array = to_bytes(255, 'big')
    })
    */

    test('randHex should return different values each time', () => {
        const others: BN[] = []
        for (let i = 0; i < 10000; i++) {
            const num = randHex(10)
            if (others.find(d => d.eq(num)))
                throw new Error('duplicate number found')
            else
                others.push(num)
        }
    })

    test('randHex should return positive values only', () => {
        for (let i = 0; i < 10000; i++) {
            expect(randHex(10).gtn(0)).toBeTruthy()
        }
    })

    test('randHex should return BN with requested length', () => {
        for (let len = 1; len <= 10; len++) {
            for (let i = 0; i < 10000; i++) {
                const num = randHex(len)
                const hex = num.toString('hex')
                expect(hex.length).toBe(len)
            }
        }
    })
})