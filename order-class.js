export class Order{
    constructor(departure, arrival, date){
        this.departure = departure
        this.arrival = arrival
        this.date = date
    }

    get getDeparture(){
        return this.departure
    }

    get getArrival(){
        return this.arrival
    }

    get getDate(){
        return this.date
    }
}