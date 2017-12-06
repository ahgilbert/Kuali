const initBuilding = (numElevators, numFloors) => {
    const elevator = {
        floor: 1,
        trips: 0,
        destinations: [],
        addDestination: (floor) => { console.log(`add ${floor} to your destination list`) },
        tick: () => {
            if (destinations.length === 0)
                return;
            if (destinations.includes(floor)) {
                console.log(`elevator ${id} stopping at floor ${floor}`);
                destinations = destinations.filter((x) => x !== floor);
            }
        }
    };

    return {
        topFloor: numFloors,
        elevators: Array(numElevators).fill(elevator),
        call: (dest) => { console.log(`please send an elevator to ${dest}`) },
        tick: () => { console.log('all elevators move 1 floor, let people on/off, or idle') }
    }
}

const numElevators = parseInt(process.argv[2]);
const numFloors = parseInt(process.argv[3]);
console.log(numElevators);
console.log(numFloors);
