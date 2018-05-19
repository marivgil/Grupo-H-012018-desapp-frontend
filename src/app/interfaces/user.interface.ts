import { Vehicle } from "./vehicle.interface";

export interface User{
    cuil:number,
    isEnable:boolean;
    reputation:number;
    credit:number;
    vehicles: Vehicle[];
}