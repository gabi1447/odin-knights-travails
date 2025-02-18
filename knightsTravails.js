function retrievePossibleNextPositions(arrPosition) {
    let possiblePositions = [];
    const p1 = [arrPosition[0] - 2, arrPosition[1] + 1];
    const p2 = [arrPosition[0] - 1, arrPosition[1] + 2];
    const p3 = [arrPosition[0] + 1, arrPosition[1] + 2];
    const p4 = [arrPosition[0] + 2, arrPosition[1] + 1];
    const p5 = [arrPosition[0] + 2, arrPosition[1] - 1];
    const p6 = [arrPosition[0] + 1, arrPosition[1] - 2];
    const p7 = [arrPosition[0] - 1, arrPosition[1] - 2];
    const p8 = [arrPosition[0] - 2, arrPosition[1] - 1];

    [p1, p2, p3, p4, p5, p6, p7, p8].forEach((position) => {
        if (
            position[0] >= 0 &&
            position[0] <= 7 &&
            position[1] >= 0 &&
            position[1] <= 7
        ) {
            possiblePositions.push(position);
        }
    });

    return possiblePositions;
}

function isValidPosition(position) {
    if (position.length !== 2) {
        return false;
    } else if (
        position[0] >= 0 &&
        position[0] <= 7 &&
        position[1] >= 0 &&
        position[1] <= 7
    ) {
        return true;
    } else {
        return false;
    }
}

function isPositionInSet(array, set) {
    const stringPosition = arrayToString(array);
    return set.has(stringPosition);
}

function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

function arrayToString(array) {
    return JSON.stringify(array);
}

function graphNode(coordinates, currentPath) {
    let path = currentPath;

    function updatePath(vertex) {
        path.push(vertex);
    }

    return {
        position: coordinates,
        path,
        updatePath,
    };
}

function printShortPath(path) {
    console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
    for (move of path) {
        console.log(move);
    }
}

function knightMoves(origin, destination) {
    if (isValidPosition(origin) && isValidPosition(destination)) {
    } else {
        return null;
    }

    let queue = [];
    let visited = new Set();
    let shortPath;
    let hasDestinationBeenFound = false;

    const originNode = graphNode(origin, [origin]);
    queue.push(originNode);

    if (areArraysEqual(originNode.position, destination)) {
        shortPath = originNode.path;
        printShortPath(shortPath);
        return;
    }

    while (true) {
        let currentNode = queue[0];

        visited.add(arrayToString(currentNode.position));
        const legalNextMoves = retrievePossibleNextPositions(
            currentNode.position
        );

        for (let move of legalNextMoves) {
            if (isPositionInSet(move, visited)) {
                continue;
            } else if (areArraysEqual(move, destination)) {
                const destinationNode = graphNode(move, currentNode.path);
                destinationNode.updatePath(move);
                shortPath = destinationNode.path;
                hasDestinationBeenFound = true;
                break;
            } else {
                const newNode = graphNode(move, [...currentNode.path]);
                newNode.updatePath(move);
                queue.push(newNode);
            }
        }

        if (hasDestinationBeenFound) {
            break;
        }

        queue.shift();
    }

    printShortPath(shortPath);
}
