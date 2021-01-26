import { Timeflake } from './timeflake'
import { atoi, from_bytes, itoa, timer, to_bytes } from './utils'
import { PolyRand } from 'poly-crypto'
import { BASE62, HEX } from './timeflake'

/**
 * 
 */

interface arg_bytes {
    type: 'bytes'
    value: Uint8Array
}
interface arg_int {
    type: 'int'
    value: number
}
interface arg_hex {
    type: 'hex'
    value: string
}
interface arg_base62 {
    type: 'base62'
    value: string
}

type parse_arg = 
    | arg_base62
    | arg_int
    | arg_hex
    | arg_bytes

export function parse(arg: parse_arg): Timeflake {
    let res: Uint8Array | undefined = undefined
    switch (arg.type) {
        case 'int': {
            res = to_bytes(arg.value, 'big')
        } break

        case 'base62': {
            res = to_bytes(atoi(arg.value, BASE62), 'big')
        } break

        case 'bytes': {
            res = arg.value
        } break

        case 'hex': {
            res = to_bytes(atoi(arg.value, HEX), 'big')
        } break
    }

    if (res)
        return new Timeflake(res)
    else
        throw new Error('must provide one of [bytes, int, hex, base62]')
}

const getTime = timer()

/**
 * 
 */
export function random() {
    const timestamp = getTime()
    const rand = parseInt('0x' + PolyRand.hex(10))
    const value = to_bytes(((timestamp << 80) | rand), 'big')
    return new Timeflake(value)
}

/**
 * 
 * @param timestamp 
 * @param random 
 */
export function from_values(timestamp: number, random?: number) {
    if (!random)
        random = parseInt('0x' + PolyRand.hex(10))

    const value = to_bytes(((timestamp << 80) | random), 'big')
    return new Timeflake(value)
}