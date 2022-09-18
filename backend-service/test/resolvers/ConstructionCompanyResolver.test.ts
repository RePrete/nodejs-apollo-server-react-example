import constructionCompanyResolver from "../../src/resolvers/ConstructionCompanyResolver";
import {Speciality} from "../../src/domain/ConstructionCompany";

test('ConstructionCompanies', () => {
    const context = {
        dataSources: {
            companiesDataSource: {
                get:jest.fn()
            }
        }
    }
    const args = {
        filters: {
            specialities: [Speciality.PLUMPING]
        }
    }
    const sut = constructionCompanyResolver;
    sut.ConstructionCompanies(null, args, context, null);
    expect(context.dataSources.companiesDataSource.get.mock.calls.length).toBe(1);
    expect(context.dataSources.companiesDataSource.get.mock.calls[0][0]).toBe(args.filters);
});