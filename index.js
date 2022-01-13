let data = require('./data.json');
const Elevator = require("./modules/Elevator");
var args = process.argv.slice(2);

const numberOfFloors = Number((args[1] === 'test') ? args[0] : args[args.length-1]);
if (numberOfFloors === 0)
	throw "Invalid number of floors";

elevatorsObject = data.elevators;
peopleObject = data.people;

let numberOfElevators = elevatorsObject.length;

let serviceElevators = [];
elevatorsObject.forEach(function(elevator){
	serviceElevators.push(new Elevator(elevator.number, elevator.currentFloor, elevator.direction, elevator.activeStops, elevator.maximumStops));
});

const elevators = serviceElevators;

console.log('----Part 1 output: -----\n');
let person = {
	currentFloor: Math.floor(Math.random() * 10000 % numberOfFloors),
	requestedFloor: Math.floor(Math.random() * 6000 % numberOfFloors)
}

let counter = 0;
if (person.currentFloor === person.requestedFloor) {
	while (counter < 5) {
		person.requestedFloor = Math.floor(Math.random() * 6000 % numberOfFloors);
		counter++;
	}
}

console.log('Person 1: at floor: ' + person.currentFloor + ' going to floor: ' + person.requestedFloor + '. Assigned elevator: ' + goToFloor(person.currentFloor, person.requestedFloor).toString() + '\n');

console.log('----Part 2 output: -----\n');

const numberOfPeople = Math.floor(Math.random() * 5  + 5); //Random number between 5 and 10
let peopleArray = [];
for (let i = 0; i < numberOfPeople; i++){
	peopleArray.push({
		currentFloor: Math.floor(Math.random() * 10000 % numberOfFloors),
		requestedFloor: Math.floor(Math.random() * 6000 % numberOfFloors)
	});
}

console.log('People: ');
console.log(peopleArray)
peopleArray.forEach(function(person){
	let assignedElevatorNumber = goToFloor(person.currentFloor, person.requestedFloor);
	let assignedElevatorIndex = elevators.findIndex(elevator => {
	  return elevator.getNumber() === assignedElevatorNumber
	});
	//Now we will change the elevator status with the new person on board
	if (elevators[assignedElevatorIndex].getDirection() === 0)
		elevators[assignedElevatorIndex].setDirection(elevators[assignedElevatorIndex].getCurrentFloor() < person.currentFloor ? 1 : -1);
	if (elevators[assignedElevatorIndex].getActiveStops().indexOf(person.requestedFloor) === -1)
		elevators[assignedElevatorIndex].addStop(person.requestedFloor);
});

let totalTravelTime;
elevators.forEach(function(elevator, index){
	if (elevator.getDirection() === 0)
		totalTravelTime += 0;
	else 
		totalTravelTime = Math.abs(elevator.getCurrentFloor() - elevator.getActiveStops()[elevator.getActiveStops().length-1]) * elevator.getSpeed();
});

console.log('Minimum travel time for ' + numberOfPeople.toString() + ' people: ' + totalTravelTime.toString() + ' seconds\n');

function goToFloor(currentFloor, requestedFloor, returnTravelTime){
	let direction = (currentFloor < requestedFloor) ? 1 : -1;

	let elevatorStatusArray = [];

	elevators.forEach(function(elevator, index){
		let floorsTrip;
		let calculatedDirection;
			
		//If idle or going up - we will consider direct trip
		floorsTrip = Math.abs(currentFloor - elevator.getCurrentFloor());
		//if going to the same direction, we will calculate from the first stop when full. If the elevator is higher up, we will also go the different direction	
		calculatedDirection = (elevator.getDirection() === direction && ((direction > 0 && elevator.getCurrentFloor() > currentFloor) || (direction < 0 && elevator.getCurrentFloor() < currentFloor))) ? direction * -1 : direction;
		//If going in a different direction
		if (calculatedDirection !== direction) 
			floorsTrip = Math.abs(elevator.getCurrentFloor() - elevator.getActiveStops()[elevator.getActiveStops().length-1]) + Math.abs(elevator.getActiveStops()[elevator.getActiveStops().length-1] - currentFloor)
		
		let travelTime = floorsTrip * elevator.getSpeed();
		elevatorStatusArray.push({
			number: elevator.getNumber(),
			travelTime: travelTime
		});
	});
	return elevatorStatusArray.sort((elevatorA, elevatorB) => {
		return elevatorA.travelTime < elevatorB.travelTime ? -1 : 1;
	})[0].number;

}