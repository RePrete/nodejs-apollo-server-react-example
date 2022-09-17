export class ConstructionCompany {
    public uuid: string
    public name: string
    public logoUrl: string
    public specialities: string[]
    public city: string

    constructor(
        {
            uuid,
            name,
            logoUrl,
            specialities,
            city
        }: {
            uuid: string,
            name: string,
            logoUrl: string,
            specialities: string[],
            city: string
        }
    ) {
        this.uuid = uuid;
        this.name = name;
        this.logoUrl = logoUrl;
        this.specialities = specialities;
        this.city = city;
    }
}

export enum Speciality {
    EXCAVATION = "EXCAVATION",
    PLUMPING = "PLUMPING",
    ELECTRICAL = "ELECTRICAL"
}