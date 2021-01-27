/**
 * original source code is from https://github.com/anthonynsimon/timeflake/blob/master/timeflake/flake.py
 * license: MIT License
 */

import BN from 'bn.js'
import LRU from 'lru-cache'
import { v1, v3, v4, v5, stringify } from 'uuid'
import { lru_cache } from './lru_cache'

import { atoi, itoa } from './utils'

export const BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
export const HEX = '0123456789abcdef'
export const MAX_TIMESTAMP = new BN('281474976710655')
export const MAX_RANDOM = new BN('1208925819614629174706175')
export const MAX_TIMEFLAKE = new BN('340282366920938463463374607431768211455')

/**
 * typescript implementation of timeflake written in python.
 */
export class Timeflake {
    private _bytes: BN

    /**
     * creates Timeflake object from given bytes array.
     * @throws throws Error if flake is not valid.
     * @param from_bytes 
     */
    constructor(from_bytes: BN) {
        this._bytes = from_bytes

        const as_BN = this.int
        if (as_BN.lt(new BN(0)) || as_BN.gte(new BN(MAX_TIMEFLAKE)))
            throw new Error('Invalid flake provided')
    }

    get bytes(): Uint8Array {
        return this._bytes.toArrayLike(Buffer, 'be')
    }

    get int(): BN {
        return this._bytes
    }

    /**
     * returns UUID v4
     */
    get uuidv4() {
        return v4(undefined, this.bytes)
    }

    get stringify(): string {
        return stringify(this.uuidv4)
    }

    @lru_cache(1)
    get hex(): string {
        return itoa(this.int, HEX, 32)
    }

    @lru_cache(1)
    get base62(): string {
        return itoa(this.int, BASE62, 22)
    }

    get timestamp(): BN {
        return this.int.shrn(80)
    }

    get random(): BN {
        return this.int.and(MAX_RANDOM)
    }
}