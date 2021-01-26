/**
 * convert uint8 array to unsigned number aligned with Big endian
 * @param array big order uint8 byte array
 */
export function from_bytes(array: Uint8Array) {
    return array.reduce((acc, curr) => {
        acc = acc << 8
        acc += curr
        return acc
    }, 0)
}

/**
 * converts an int value to a str, using the given alphabet.
 * Padding can be computed as: ceil(log of max_val base alphabet_len)
 * @param value 
 * @param alphabet 
 * @param padding 
 */
export function itoa(value: number, alphabet: string, padding?: number) {
    if (value < 0)
        throw Error('Only possive numbers are allowed')
    else if (value == 0)
        return alphabet[0]

    let result = ''
    const base = alphabet.length

    while (value) {
        const div = value / base
        const rem = value % base
        result = alphabet.charAt(rem) + result
        value = div
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
export function atoi(value: string, alphabet: string) {
    if (value == alphabet.charAt(0))
        return 0

    function index_alphabet_map(value: string) {
        const obj: any = {}
        for (let i = 0; i < value.length; i++)
            obj[i] = value.charAt(i)

        return obj
    }

    const index = index_alphabet_map(alphabet)
    let result = 0
    const base = alphabet.length

    for (const char of value)
        result = result * base + index[char]

    return result
}