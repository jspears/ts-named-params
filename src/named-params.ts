import type {Fn, AllArgsFn} from './types';

function keyValue(all: any[]) {
    const ret = {} as Record<string, unknown>;
    for (let i = 0; i < all.length; i += 2) {
        const arg = typeof all[i]
        if (arg === 'string' || arg === 'number' || arg === 'symbol') {
            ret[arg] = all[i + 1];
        } else {
             return;
        }
    }
    return ret;
}

export function args<T extends Fn>(fn: T): (...a: AllArgs<Parameters<T>[0]>) => ReturnType<T> {
    return (...all: AllArgs<Parameters<T>[0]>): ReturnType<T> => {
        if (all.length === 1) {
            return fn.call(null, all[0]);
        }
        let obj = keyValue(all)
        if (!obj) {
            throw new Error('not a valid call signature');
        }
        return fn.call(null, obj)
    }
}
