import {ApolloServer, gql} from 'apollo-server-express';
import express from 'express';
import config from 'config';
import CompaniesDataSource from "./data-sources/CompaniesDataSource";
import constructionCompanyResolver from "./resolvers/ConstructionCompanyResolver";

export const main = async () => {
  const app = express();
  const typeDefs = gql`
    type ConstructionCompany {
      uuid: ID!
      name: String!
      logoUrl: String!
      specialities: [ConstructionSpeciality!]!
      city: String
    }
    
    enum ConstructionSpeciality {
      EXCAVATION
      PLUMPING
      ELECTRICAL
    } 
    
    type Query {
      ConstructionCompanies(filters: ConstructionCompanyFilters): [ConstructionCompany]
    }
    
    input ConstructionCompanyFilters {
      name: String
      specialities: [ConstructionSpeciality]
    }
  `;

  const resolvers = {
    Query: {
      ...constructionCompanyResolver
    }
  }

  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    dataSources: () => {
      return {
        companiesDataSource: new CompaniesDataSource()
      }
    },
  });

  await server.start();

  const corsOptions = { origin: '*', credentials: true };

  server.applyMiddleware({
    app,
    cors: corsOptions
  });

  app.listen({ port: config.get('server.port') }, () => console.info(
    `🚀 Server ready and listening at ==> http://localhost:${config.get('server.port')}${
      server.graphqlPath
    }`,
  ));
};

main().catch((error) => {
  console.error('Server failed to start', error);
});