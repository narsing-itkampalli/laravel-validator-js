function isPlainObject(obj) {
    return typeof obj === 'object' &&
        obj !== null &&
        !Array.isArray(obj) &&
        Object.getPrototypeOf(obj) === Object.prototype;
}

const originalData = {
    "users.": [
        {
            firstname: 'narsing',
            lastname: 'itkampalli',
            email: 'narsing@gmail.com',
            skill: [
                {
                    _id: 1,
                    name: "singing"
                },
                {
                    _id: 2,
                    name: 'dancing'
                }
            ]
        },
        {
            firstname: 'mahesh',
            lastname: 'metre',
            email: 'mahesh@gmail.com',
            skill: [
                {
                    _id: 1,
                    name: "music",
                    types: [
                        "music type1",
                        "ball"
                    ]
                },
                {
                    _id: 2,
                    name: 'app dev',
                    types: [
                        "dog",
                        "cat"
                    ]
                }
            ]
        },
        {
            firstname: 'jack',
            lastname: 'sparrow',
            email: 'jack@gmail.com',
            skill: [
                {
                    _id: 1,
                    name: "web",
                    types: [
                        "dog",
                        "cat"
                    ]
                },
                {
                    _id: 2,
                    name: 'android',
                    types: [
                        "dog",
                        "cat"
                    ]
                }
            ]
        },
        {
            firstname: 'ratikant',
            lastname: 'itkampalli',
            email: 'ratikant@gmail.com',
            skill: [
                {
                    _id: 1,
                    name: "hi",
                    types: [
                        "dog",
                        "cat"
                    ]
                },
                {
                    _id: 2,
                    name: 'hello',
                    types: [
                        "dog",
                        "cat"
                    ]
                }
            ]
        }
    ]
};


function find(data, pathString) {
    // Split path using regex and clean escaped dots
    const pathSegments = pathString
        .split(/(?<!\\)\./g)
        .map(segment => segment.replace(/\\\./g, '.'));

    // Recursive function to traverse the data
    function traverse(currentData, remainingPath, currentPath) {
        if (!remainingPath.length) {
            // Base case: return the current data with its full path
            return {
                [currentPath.map(part => part.replace(/\./g, '\\.')).join('.')]: currentData
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
                    .flatMap(([key, value]) =>
                        traverse(value, nextPath, [...currentPath, key])
                    );
            }

            return traverse(currentData?.[pathItem], nextPath, [...currentPath, currentSegment]);
        }

        // Regular traversal for non-wildcard segments
        return traverse(currentData?.[currentSegment], nextPath, [...currentPath, currentSegment]);
    }

    return traverse(data, pathSegments, []);
}
// console.log(find(originalData, 'users\\..*.skill.*.types.*'))

function has(pathString) {
    const foundData = find(originalData, pathString);

    if(Array.isArray(foundData)) {
        return foundData.some((obj) => Object.values(obj)[0] !== undefined);
    }

    return Object.values(foundData)[0] !== undefined;
}

// console.log(has('users\\..1.skill.*.types'))

// find('users\\.*.*.*name');

// find('users')

// find('user.*\\.id')