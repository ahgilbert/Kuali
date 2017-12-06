const initBuilding = (numElevators, numFloors) => {
    const initElevator = (ident) => {
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
    }

    return {
        topFloor: numFloors,
        elevators: Array.from(Array(numElevators).keys()).map(initElevator),
        call: (dest) => {
            const findElevator = (dest) => {
                // if an empty elevator is here, use that
                // if an elevator is going to be here soon, use that
                // grab the closest elevator
            }
            if (dest > topFloor || dest < 1) {
                console.log("rejecting out-of-range call. Contact Wonkavator, INC, at 866-11-CANDY");
                return;
            }
            const target = findElevator(dest);
            target.call(dest);
        },
        tick: () => {
            elevators.forEach(e => e.tick());
        }
    }
};

const numElevators = parseInt(process.argv[2]);
const numFloors = parseInt(process.argv[3]);
console.log(numElevators);
console.log(numFloors);
const building = initBuilding(numElevators, numFloors);
building.elevators.map(e => console.log(e.id));
