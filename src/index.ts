import { Timeflake } from './timeflake'
import { atoi, timer } from './utils'
import { PolyRand } from 'poly-crypto'
import { BASE62, HEX } from './timeflake'
import BN from 'bn.js'

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
    let res: BN | undefined = undefined
    switch (arg.type) {
        case 'int': {
            res = new BN(arg.value)
        } break

        case 'base62': {
            res = atoi(arg.value, BASE62)
        } break

        case 'bytes': {
            res = new BN(arg.value)
        } break

        case 'hex': {
            res = atoi(arg.value, HEX)
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
    const rand = new BN(PolyRand.hex(10))
    // const rand = parseInt('0x' + PolyRand.hex(10))
    const value = timestamp.ishln(80).ior(rand)
    return new Timeflake(value)
}

/**
 * 
 * @param timestamp 
 * @param random 
 */
export function from_values(timestamp: BN, random?: BN) {
    if (!random)
        random = new BN(PolyRand.hex(10))

    const value = timestamp.shln(80).and(random)
    return new Timeflake(value)
}