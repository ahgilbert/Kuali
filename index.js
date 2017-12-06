console.log("let's make some elevators");

const initBuilding = (numFloors, numElevators) => {
    const elevator = { floor: 0, trips: 0, destinations: [] };

    return {
        topFloor: numFloors,
        elevators: Array(numElevators).fill(elevator),
        call: (dest) => { console.log(`please send an elevator to ${dest}`) }
    }
}
