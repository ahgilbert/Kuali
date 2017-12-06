const initBuilding = (numElevators, numFloors) => {
    this.initElevator = (ident) => {
        this.id = ident;
        this.currentFloor = 1;
        this.currentDirection = 1;
        this.tripCount = 0;
        this.floorCount = 0;
        this.destinations = [];
        this.shouldSwitchDirection = () => {
            if (currentDirection > 0) {
                return destinations.filter((x) => x > currentFloor).length === 0
            } else {
                return destinations.filter((x) => x < currentFloor).length === 0
            }
        };
        this.addDestination = (currentFloor) => {
            if(tripCount >= 100) {
                console.log(`elevator ${id} is in maintenence mode`);
                return false;
            } else {
                destinations.push(currentFloor);
                destinations = [ ...new Set(destinations) ].sort();
                tripCount++;
                return true;
            }
        };
        this.tick = () => {
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
            console.log(`elevator ${id}, going ${currentDirection > 0 ? 'up' : 'down'}!`);
            currentFloor += currentDirection;
        };

        return this;
    };

    this.topFloor = numFloors;
    this.elevators = Array.from(Array(numElevators).keys()).map(this.initElevator);
    this.call = (dest) => {
        const findElevator = (dest) => {
            // if an empty elevator is here, use that
            const empties = this.elevators.filter(e => {
                return e.destinations.length === 0 && e.currentFloor === dest;
            });

            if (empties.length > 0)
                return empties[0];

            // if an elevator is going to be here soon, use that
            const inbounds = this.elevators.filter(e => {
                const rightWay = (dest < e.currentFloor) === (e.currentDirection < 0);
                const willStopHere = e.destinations.includes(dest);
                return rightWay && willStopHere;
            });
            if (inbounds.length > 0)
                return inbounds[0];

            // otherwise, grab the closest elevator
            const byProximity = this.elevators.sort(e => Math.abs(dest - e.currentFloor));
            return byProximity[0];
        }
        if (dest > this.topFloor || dest < 1) {
            console.log("rejecting out-of-range call. Contact Wonkavator, INC, at 866-11-CANDY");
            return;
        }
        const target = findElevator(dest);
        target.call(dest);
    };
    this.tick = () => {
        elevators.forEach(e => e.tick());
    };

    return this;
};

const numElevators = parseInt(process.argv[2]);
const numFloors = parseInt(process.argv[3]);
console.log(`placing ${numElevators} elevators on ${numFloors} floors.`);
const building = initBuilding(numElevators, numFloors);
building.call(4);
