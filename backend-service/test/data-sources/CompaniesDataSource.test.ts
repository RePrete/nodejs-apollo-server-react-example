import CompaniesDataSource from "../../src/data-sources/CompaniesDataSource";
import {ConstructionCompany, Speciality} from "../../src/domain/ConstructionCompany";

test('CompaniesDataSource', () => {
    const sut = new CompaniesDataSource();
    const result = sut.get();
    expect(result.length).toBe(7)
})

test('CompaniesDataSource with PLUMPING speciality ', () => {
    const sut = new CompaniesDataSource();
    const result = sut.get({
        specialities: [Speciality.PLUMPING]
    });
    expect(result.length).toBe(4)
    result.forEach((company: ConstructionCompany) => {
        expect(company.specialities.includes(Speciality.PLUMPING))
    })
})

test('CompaniesDataSource with given name ', () => {
    const sut = new CompaniesDataSource();
    let result = sut.get({
        name: 'Bechtel'
    });
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('Bechtel')

    result = sut.get({
        name: 'corporation'
    });
    expect(result.length).toBe(3)
    result.forEach((company: ConstructionCompany) => {
        expect(company.name.toLowerCase().includes('corporation'))
    })
})

