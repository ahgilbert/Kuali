const initBuilding = (numElevators, numFloors) => {
    const elevator = (ident) => {
        return {
            id: ident,
            currentFloor: 1,
            currentDirection: 1,
            tripCount: 0,
            floorCount: 0,
            destinations: [],
            shouldSwitchDirection: () => {
                if (currentDirection > 0) {
                    return destinations.filter((x) => x > currentFloor).length === 0
                } else {
                    return destinations.filter((x) => x < currentFloor).length === 0
                }
            },
            addDestination: (currentFloor) => {
                if(tripCount >= 100) {
                    console.log(`elevator ${id} is in maintenence mode`);
                    return false;
                } else {
                    destinations.push(currentFloor);
                    destinations = [ ...new Set(destinations) ].sort();
                    tripCount++;
                    return true;
                }
            },
            tick: () => {
                if (destinations.length === 0)
                    return;
                if (destinations.includes(currentFloor)) {
                    console.log(`elevator ${id} stopping at floor ${currentFloor}`);
                    destinations = destinations.filter((x) => x !== currentFloor);
                    if (shouldSwitchDirection(currentFloor, currentDirection, destinations)) {
                        currentDirection = currentDirection * -1;
                    }
                }
                // need to move to the most appropriate floor
                floorCount++;
                currentFloor += currentDirection;
            }
        };

        return {
            topFloor: numFloors,
            elevators: Array(numElevators).fill(elevator),
            call: (dest) => { console.log(`please send an elevator to ${dest}`) },
            tick: () => { console.log('all elevators tick once') }
        }
    };
};

const numElevators = parseInt(process.argv[2]);
const numFloors = parseInt(process.argv[3]);
console.log(numElevators);
console.log(numFloors);
