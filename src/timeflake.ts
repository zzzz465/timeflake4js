/**
 * original source code is from https://github.com/anthonynsimon/timeflake/blob/master/timeflake/flake.py
 * license: MIT License
 */

import BN from 'bn.js'
import { lru_cache } from './lru_cache'

import { itoa } from './utils'

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
        return this._bytes.clone()
    }

    /**
     * returns UUID v4
     */
    @lru_cache(1)
    get uuid(): string {
        return [
            this.hex.slice(0, 8), 
            this.hex.slice(8, 12), 
            this.hex.slice(12, 16), 
            this.hex.slice(16, 20), 
            this.hex.slice(20)].join('-')
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