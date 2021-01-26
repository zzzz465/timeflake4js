import Cache from 'lru-cache'

export function lru_cache(max: number) {
    const cache = new Cache({ max })
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (cache.has(propertyKey)) {
            return cache.get(propertyKey)
        }
        else {
            
        }
    }
}