import isPlainObject from "../utils/is-plain-object.js";

export type ValidatorDataParsedValue = {path:string[], key: string, value: any};

export default class ValidatorData {
    value:Record<string, any>|any[] = [];

    constructor(data:FormData|HTMLFormElement|Record<string, any>|(any)[]) {
        try {
            if(data instanceof HTMLFormElement) {
                data = new FormData(data);
            }
        }catch{}

        if(!(data instanceof FormData)) {
            this.value = data;
        }else {
            const objectData:Record<string, any> = {};

            data.forEach((value, key) => {
                let hasMultipleValue = false;

                if(key.endsWith('[]')) {
                    key = key.slice(0, -2);
                    hasMultipleValue = true;
                }

                if(hasMultipleValue) {
                    if(Array.isArray(objectData[key])) {
                        objectData[key].push(value);
                    }else {
                        objectData[key] = [value];
                    }
                }

                objectData[key] = value;
            });

            this.value = objectData;
        }
    }

    has(pathString:string) {
        const foundData = this.get(pathString);

        if(Array.isArray(foundData)) {
            return foundData.some((obj) => obj.value !== undefined);
        }

        return foundData.value !== undefined;
    }

    get(pathString:string) {
        /*
            \* is not a valid string, it returns undefined
            \. is valid
        */
        // Split path using regex and clean escaped dots
        const pathSegments = pathString
            .split(/(?<!\\)\./g)
            .map(segment => segment.replace(/\\\./g, '.'));

        // Recursive function to traverse the data
        function traverse(currentData:any, remainingPath:string[], currentPath:string[]):ValidatorDataParsedValue | ValidatorDataParsedValue[] {
            if (!remainingPath.length) {
                // Base case: return the current data with its full path
                return {
                    path: currentPath.map(part => part.replace(/\./g, '\\.')),
                    key: currentPath[currentPath.length - 1],
                    value: currentData
                };
            }

            const currentSegment = remainingPath[0];
            const nextPath = remainingPath.slice(1);

            if (currentSegment.includes('*')) {
                const regex = new RegExp(`^${currentSegment.replace(/\*/g, '.*')}$`);

                if (Array.isArray(currentData) || isPlainObject(currentData)) {
                    // Collect matches and recursively process them
                    return Object.entries(currentData)
                        .filter(([key]) => regex.test(key))
                        .flatMap(([key, value]:[string, any]) =>
                            traverse(value, nextPath, [...currentPath, key])
                        );
                }

                return [traverse(currentData?.[currentSegment], [], [...currentPath, ...nextPath, currentSegment])].flat(1);
                // return [];
            }

            // Regular traversal for non-wildcard segments
            return traverse(currentData?.[currentSegment], nextPath, [...currentPath, currentSegment]);
        }

        return traverse(this.value, pathSegments, []);
    }
}