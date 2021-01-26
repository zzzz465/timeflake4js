
declare function hex(length: number): string

declare module 'poly-crypto' {
    declare const PolyRand = {
        hex
    }
}