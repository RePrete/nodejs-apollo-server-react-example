const constructionCompanyResolver = {
    ConstructionCompanies: (_parent: any, args: any, context: any, _info: any) => {
        return context.dataSources.companiesDataSource.get(args.filters);
    }
}

export default constructionCompanyResolver;