import BN from 'bn.js'

const zero = new BN(0)

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
    if (typeof value === 'number')
        value = new BN(value)

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
        return zero

    function index_alphabet_map(value: string) {
        const obj: any = {}
        for (let i = 0; i < value.length; i++)
            obj[i] = value.charAt(i)

        return obj
    }

    const index = index_alphabet_map(alphabet)
    const result = zero
    const base = alphabet.length

    for (const char of value)
        result.imuln(base).iaddn(index[char])

    return result
}

/**
 * creates timer function which returns current time in nanoseconds
 */
export function timer(): () => BN {
    if (process != undefined)
        return function () { return new BN(Math.floor(process.hrtime()[1])) }
    else
    // browser?
    // https://stackoverflow.com/questions/6233927/microsecond-timing-in-javascript
        return () => new BN(window.performance.now())
}