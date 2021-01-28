# Timeflake4js

javscript & typescript implementation of [Timeflake](https://github.com/anthonynsimon/timeflake)  
due to timer function, this module is Node.js only. only, web environment is not supported yet.  

> Timeflake is a 128-bit, roughly-ordered, URL-safe UUID. Inspired by Twitter's Snowflake, Instagram's ID and Firebase's PushID.

## Install
this module depends on [BN.js](https://github.com/indutny/bn.js/) library
```
npm install --save bn.js
npm install --save timeflake
```

# Usage

## Example
```js
// use require() on Node.js javascript
// import { parse, random, from_values } from 'timeflake'
import flakejs from 'timeflake'
import BN from 'bn.js'

// create random timeflake object
const flake = flakejs.random()

const timestamp = new BN(/* timestmap */)

const flake2 = flakejs.from_values(timestamp, /* new BN(random seed) */)

const parsed = flakejs.parse(/* parse_arg */)
```

interface for `flakejs.parse`

```ts
interface arg_bytes {
    type: 'bytes'
    value: Uint8Array
}
interface arg_int {
    type: 'int'
    value: number
}
interface arg_BN {
    type: 'BN',
    value: BN
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
    | arg_BN
```

## flakejs.parse() example

```js
const hex_arg = {
    type: 'hex',
    value: '016fa936bff0997a0a3c428548fee8c9'
}
flakejs.parse(hex_arg)

const BN_arg = { // if the integer value is over javascript native number's range
    type: 'BN',
    value: new BN('integer value')
}
flakejs.parse(BN_arg)

const bytes = [
    // b"\x01o\xa96\xbf\xf0\x99z\n<B\x85H\xfe\xe8\xc9"
    1, 111, 169, 54, 191, 240, 153, 122, 10, 60, 66,
    133, 72, 254, 232, 201
]
const base62_arg = {
    type: 'bytes',
    value: new Uint8Array(bytes)
}
flakejs.parse(base62_arg)

const int_arg = {
    type: 'int',
    value: 472374327423 // exmaple value, range: 0 <= value <= 2^51 - 1
}
flakejs.parse(int_arg)

const base62_arg = {
    type: 'base62',
    value: '02i1KoFfY3auBS745gImbZ'
}
flakejs.parse(base62_arg)
```

# Note on security
see the original article
[Link](https://github.com/anthonynsimon/timeflake#note-on-security)

# Note on privacy
see the original article
[Link](https://github.com/anthonynsimon/timeflake#note-on-privacy)

# License
Licensed under the MIT License