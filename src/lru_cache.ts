/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Cache from 'lru-cache'

/**
 * add lru_cache with specific size
 * @param max max size of lru_cache
 * @deprecated possible memory leak and duplicated propertyKey issue.
 */
export function lru_cache(max: number) {
    const cache = new Cache({ max })
    return function (target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
        const originalGetter = descriptor.get as () => any
        descriptor.get = function () {
            if (!cache.has(propertyKey))
                cache.set(propertyKey, originalGetter.call(this))
            
            return cache.get(propertyKey)
        }

        return descriptor
    }
}