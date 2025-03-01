import isPlainObject from "../utils/is-plain-object";
export default class ValidatorData {
    constructor(data) {
        this.value = [];
        try {
            if (data instanceof HTMLFormElement) {
                data = new FormData(data);
            }
        }
        catch { }
        if (!(data instanceof FormData)) {
            this.value = data;
        }
        else {
            const objectData = {};
            data.forEach((value, key) => {
                let hasMultipleValue = false;
                if (key.endsWith('[]')) {
                    key = key.slice(0, -2);
                    hasMultipleValue = true;
                }
                if (hasMultipleValue) {
                    if (Array.isArray(objectData[key])) {
                        objectData[key].push(value);
                    }
                    else {
                        objectData[key] = [value];
                    }
                }
                objectData[key] = value;
            });
            this.value = objectData;
        }
    }
    has(pathString) {
        const foundData = this.get(pathString);
        if (Array.isArray(foundData)) {
            return foundData.some((obj) => obj.value !== undefined);
        }
        return foundData.value !== undefined;
    }
    get(pathString) {
        const pathSegments = pathString
            .split(/(?<!\\)\./g)
            .map(segment => segment.replace(/\\\./g, '.'));
        function traverse(currentData, remainingPath, currentPath) {
            if (!remainingPath.length) {
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
                    return Object.entries(currentData)
                        .filter(([key]) => regex.test(key))
                        .flatMap(([key, value]) => traverse(value, nextPath, [...currentPath, key]));
                }
                return [traverse(currentData === null || currentData === void 0 ? void 0 : currentData[currentSegment], [], [...currentPath, ...nextPath, currentSegment])].flat(1);
            }
            return traverse(currentData === null || currentData === void 0 ? void 0 : currentData[currentSegment], nextPath, [...currentPath, currentSegment]);
        }
        return traverse(this.value, pathSegments, []);
    }
}
