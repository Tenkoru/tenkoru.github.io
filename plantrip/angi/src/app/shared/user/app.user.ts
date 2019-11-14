import { Trip } from 'src/app/index/app.trip';

export interface User {
    id: number,
    name: string,
    trips?: Trip[],
    avatar?: string,
}
