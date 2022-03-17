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

    private _uuid: string = ''

    /**
     * returns UUID v4
     */
    get uuid(): string {
        if (!this._uuid) {
            this._uuid = [this.hex.slice(0, 8), 
            this.hex.slice(8, 12), 
            this.hex.slice(12, 16), 
            this.hex.slice(16, 20), 
            this.hex.slice(20)].join('-')
        }

        return this._uuid
    }

    private _hex: string = ''

    /**
     * returns hex representation of the timeflake instance.
     */
    get hex(): string {
        if (!this._hex) {
            this._hex = itoa(this.int, HEX, 32)
        }

        return this._hex
    }

    private _base32: string = ''

    /**
     * returns base32 representation of the timeflake instance.
     */
    get base62(): string {
        if (!this._base32) {
            this._base32 = itoa(this.int, BASE62, 22)
        }
        
        return this._base32
    }

    /**
     * returns timestamp of the timeflake instance.
     */
    get timestamp(): BN {
        return this.int.shrn(80)
    }

    get random(): BN {
        return this.int.and(MAX_RANDOM)
    }
}