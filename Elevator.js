module.exports = class Elevator {
	currentFloor = 0;
	direction = 0; //0 - idle, 1 - up, -1 down TODO - change to enunms
	speed = 2; //2 seconnds per floor
	floorOpenTime = 5; //seconds doors are open (default)
	activeStops = []; //This will always be ordered as FIFO
	maximumStops = 5;
	number;

	constructor(number, currentFloor, direction, activeStops, maximumStops) {
		this.number = number;
		this.currentFloor = currentFloor;
		this.direction = direction;
		this.activeStops = activeStops;
		this.maximumStops = maximumStops;
	}

	setCurrentFloor(floor){
		this.currentFloor = floor;
	}

	getCurrentFloor(){
		return this.currentFloor;
	}

	setDirection(direction){
		this.direction = direction;
	}

	getDirection(){
		return this.direction;
	}

	addStop(stop){
		this.activeStops.push(stop);
	}

	removeStop(stop){
		let index = this.getActiveStops().indexOf(stop);
		this.activeStops.splice(index,1);
	}

	getActiveStops(){
		return this.activeStops;
	}

	getMaximumStops(){
		return this.maximumStops;
	}

	getSpeed() {
		return this.speed;
	}

	getFloorOpenTime() {
		return this.floorOpenTime;
	}

	getNumber() {
		return this.number;
	}
}
