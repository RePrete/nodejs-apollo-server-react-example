## Start the project
I always prefer to use docker for local environment.
To run the application 
 - run `docker-compose up` from project root folder (ensure ports 3000 and 3010 are free)
 - navigate [http://localhost:3010](http://localhost:3010/)
 - click `By specialities` in the left context menu

## Possible improvements
 - Move BE host in config file
 - Make the city property an object containing city name, geo and other infos
   - Create a tab to have a map view of the listed companies
 - Paginate query to backend in case of more records
 - **OR** add dynamic loading of new records during scrolling
 - Checkbox form could be implemented as table filter to have a better page layout
 - Change matching rules for text search, I have used substring search to have a balance between usability and performances
 - ~~Create a real SPA with a working side menu and so on~~
 - Share domain model between BE and FE (also the domain model could be used to create graphql definitions using typegraphql)