/**
 * original source code is from https://github.com/anthonynsimon/timeflake/blob/master/timeflake/flake.py
 * license: MIT License
 */

import LRU from 'lru-cache'
import { v1, v3, v4, v5, stringify } from 'uuid'
import { lru_cache } from './lru_cache'

import { atoi, from_bytes, itoa } from './utils'

export const BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
export const HEX = '0123456789abcdef'
export const MAX_TIMESTAMP = 281474976710655
export const MAX_RANDOM = 1208925819614629174706175
export const MAX_TIMEFLAKE = 340282366920938463463374607431768211455

/**
 * typescript implementation of timeflake written in python.
 */
export class Timeflake {
    private _bytes: Uint8Array

    /**
     * creates Timeflake object from given bytes array.
     * @throws throws Error if flake is not valid.
     * @param from_bytes 
     */
    constructor(from_bytes: Uint8Array) {
        this._bytes = from_bytes

        const as_int = this.int
        if (as_int < 0 || as_int >= MAX_TIMEFLAKE)
            throw new Error('Invalid flake provided')
    }

    get bytes(): Uint8Array {
        return this._bytes
    }

    get int(): number {
        return from_bytes(this._bytes)
    }

    /**
     * returns UUID v4
     */
    get uuidv4() {
        return v4(undefined, this._bytes)
    }

    get stringify(): string {
        return stringify(this._bytes)
    }

    @lru_cache(1)
    get hex(): string {
        return itoa(this.int, HEX, 32)
    }

    @lru_cache(1)
    get base62(): string {
        return itoa(this.int, BASE62, 22)
    }

    get timestamp(): number {
        return this.int >> 80
    }

    get random(): number {
        return this.int & MAX_RANDOM
    }
}