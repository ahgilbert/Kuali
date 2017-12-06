const initBuilding = (numElevators, numFloors) => {
    const getDirection = (from, to) => {
        if (from < to) return 1;
        if (from > to) return -1;
        return 0;
    }
    const elevator = (ident) => {
        return {
            id: ident,
            currentFloor: 1,
            tripCount: 0,
            floorCount: 0,
            destinations: [],
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
                }
                // need to move to the most appropriate floor
                floorCount++;
                currentFloor += getDirection(currentFloor, destinations[0]); // ignore bias for now
            }
        };

        return {
            topFloor: numFloors,
            elevators: Array(numElevators).fill(elevator),
            call: (dest) => { console.log(`please send an elevator to ${dest}`) },
            tick: () => { console.log('all elevators move 1 floor, let people on/off, or idle') }
        }
    };
};

const numElevators = parseInt(process.argv[2]);
const numFloors = parseInt(process.argv[3]);
console.log(numElevators);
console.log(numFloors);
