

export class BookingGatewayClient{
    async getPNRPassengersInfo(payload: any){
        return payload;
    }

    async setPassengersDataIntoReservation(number: any,payload: any){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(number);
                resolve(payload);
            }, 5000);
        })
    }
}