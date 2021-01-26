import { lru_cache } from "./lru_cache"

class Foo {
    @lru_cache(1)
    get bar() {
        return 42
    }
}

const foo = new Foo()

const bar = foo.bar

const bar2 = foo.bar