import BN from 'bn.js'
import { HEX } from './timeflake'

/**
 * converts uint8 array to unsigned number aligned with Big endian
 * @param array big order uint8 byte array
 */
/*
export function from_bytes(array: Uint8Array): BN {
    return array.reduce((acc, curr) => acc.shln(8).addn(curr), zero)
}
*/

/**
 * converts unsigned number to uint8array
 * @param value 
 */
/*
export function to_bytes(value: BN, endian: 'big' | 'little'): Uint8Array {
    if (value.ltn(0)) throw new Error('value is negative')
    const buffer: number[] = []
    let index = 0
    const ff = new BN('0xff', 'hex')
    while (value.gtn(0)) {
        buffer.push(value.uand(ff).toNumber())
        index++
        value.ishrn(8)
    }
    
    while (index < 16)
        buffer[index++] = 0

    if (endian === 'big')
        return new Uint8Array(buffer).reverse()
    else
        return new Uint8Array(buffer)
}
*/

/**
 * converts an int value to a str, using the given alphabet.
 * Padding can be computed as: ceil(log of max_val base alphabet_len)
 * @param value 
 * @param alphabet 
 * @param padding 
 */
export function itoa(value: BN | number, alphabet: string, padding?: number) {
    const zero = new BN(0)
    if (typeof value === 'number')
        value = new BN(value)
    else
        value = value.clone()

    if (value.lt(zero))
        throw Error('Only possive numbers are allowed')
    else if (value.eq(zero))
        return alphabet[0]

    let result = ''
    const base = new BN(alphabet.length)
    while (value.gt(zero)) {
        const rem = value.umod(base).toNumber()
        value.idivn(alphabet.length)
        result = alphabet.charAt(rem) + result
    }

    if (padding) {
        const fill = Math.max(padding - result.length, 0)
        result = alphabet.charAt(0).repeat(fill) + result
    }

    return result
}

/**
 * Converts a str value to an int, using the given alphabet.
 * @param value 
 * @param alphabet 
 */
export function atoi(value: string, alphabet: string): BN {
    if (value === alphabet.charAt(0))
        return new BN(0)

    function index_alphabet_map(value: string) {
        const map = new Map<string, number>()
        for (let i = 0; i < value.length; i++)
            map.set(value.charAt(i), i)

        return map
    }

    const map = index_alphabet_map(alphabet)
    const result = new BN(0)
    const base = alphabet.length

    for (const char of value) {
        const val = map.get(char)
        if (val !== undefined)
            result.imuln(base).iaddn(val)
        else
            throw new Error(`char ${char} is not exist on alphabet parameter, param: ${alphabet}`)
    }

    return result
}

/**
 * creates timer function which returns current time in nanoseconds
 */
export function timer(): () => BN {
    return function () {
        return new BN(Date.now())
    }
    /*
    if (process != undefined)
        return function () { 
            const hrtime = process.hrtime()
            const time = new BN(hrtime[0]) // second
            time.imul(new BN(10).pow(new BN(5))).iadd(new BN(hrtime[1]))

            return time
        }
    else
    // browser?
    // https://stackoverflow.com/questions/6233927/microsecond-timing-in-javascript
        return () => new BN(window.performance.now())
    */
}

// TODO: if the environment is Node.js, we could use crypto module...
/**
 * generates 10 digit 
 */
export function randHex(len: number): BN {
    const digits: string[] = [HEX[Math.floor(Math.random() * 15) + 1]]
    for (let i = 1; i < len; i++) {
        digits.push(HEX[Math.floor(Math.random() * 16)])
    }

    return new BN(digits.join(''), 'hex')
}