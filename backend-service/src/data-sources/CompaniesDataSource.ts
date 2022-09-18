import {DataSource} from "apollo-datasource";
import {ConstructionCompany, Speciality} from "../domain/ConstructionCompany";

const mockedData = [
    {
        uuid: "f0e84283-e7d1-4ca8-84aa-d69bd85f60c0",
        name: "Bechtel",
        logoUrl: "https://www.bechtel.com/App_Themes/BechtelCorporate/Images/logo.png",
        specialities: [
            Speciality.EXCAVATION,
            Speciality.ELECTRICAL,
        ],
        city: "San Francisco, CA"
    },
    {
        uuid: "10b9019b-4439-486a-9816-164bcf928186",
        name: "Fluor Corporation",
        logoUrl: "https://media-exp1.licdn.com/dms/image/C560BAQG88t_bagf8Pg/company-logo_200_200/0/1654091580063?e=1671667200&v=beta&t=5h1GItvdOtcNVEBv5P7PpOhyRu7PU1Wyh3_yW0UXwLI",
        specialities:  [
            Speciality.EXCAVATION,
            Speciality.PLUMPING,
        ],
        city: "Berkeley, CA"
    },
    {
        uuid: "a2f2ce01-6ab6-49fa-915c-8ac15c4fff2d",
        name: "Turner Corporation",
        logoUrl: "https://media-exp1.licdn.com/dms/image/C4D0BAQFdzRrX3YAi9w/company-logo_200_200/0/1519856425185?e=1671667200&v=beta&t=BIMcM-75oyEjVuCCaQENy4LDEtP4zLuwwnX5HN1I_8Y",
        specialities:  [
            Speciality.PLUMPING,
            Speciality.ELECTRICAL,
        ],
        city: "New York, NY"
    },
    {
        uuid: "714d3458-5d61-41d3-aa72-846480b0afab",
        name: "AECOM",
        logoUrl: "https://media-exp1.licdn.com/dms/image/C4D0BAQHkmXNBvtMbig/company-logo_200_200/0/1623067910574?e=1671062400&v=beta&t=jk36AQszaXnhbu_a7wBc4eSdINaagDL86M856WRezwU",
        specialities:  [
            Speciality.PLUMPING,
            Speciality.EXCAVATION,
            Speciality.ELECTRICAL,
        ],
        city: "Los Angeles, CA"
    },
    {
        uuid: "c48edc29-0d5f-4a0c-a1fc-8f2068c49821",
        name: "Skanska USA",
        logoUrl: "https://www.usa.skanska.com/4ae4c0/globalassets/common-items/skanska_logotype_posblue.svg",
        specialities:  [
            Speciality.EXCAVATION,
        ],
        city: "New York, NY"
    },
    {
        uuid: "7bd425ba-d2e6-4d61-903e-bf38c1276c63",
        name: "Kiewit Corporation",
        logoUrl: "https://media-exp1.licdn.com/dms/image/C560BAQEpearuEEmuLg/company-logo_200_200/0/1519856150326?e=1671062400&v=beta&t=c3lb3j_lQgmZLxqNnu_ugK9UM_-f39RCZoB7tfgLqTk",
        specialities:  [
            Speciality.EXCAVATION,
            Speciality.ELECTRICAL,
        ],
        city: "Omaha, NE"
    },
    {
        uuid: "a02df50f-03e5-4bc5-a15a-dcff9202f15c",
        name: "Jacobs Engineering Group",
        logoUrl: "https://media-exp1.licdn.com/dms/image/C560BAQHKxXfAR2QclA/company-logo_200_200/0/1657153439450?e=1671062400&v=beta&t=00reXwtzI1UyktOvp7ziwpg2ysAxm8476F8olo5sWvY",
        specialities:  [
            Speciality.PLUMPING,
        ],
        city: "Dallas, TX"
    },
];

export default class CompaniesDataSource extends DataSource {
    get({name, specialities}: {
        name?: string | null,
        specialities?: [Speciality] | [] | null
    } = {
        name: null,
        specialities: null
    }): ConstructionCompany[] {
        let result = mockedData;

        if (name) {
            result = result.filter((rawCompany) => rawCompany.name.toLowerCase().includes(<string>name?.toLowerCase()));
        }

        // This will match at least one requested specialty
        if (specialities && specialities.length > 0) {
            result = result.filter((rawCompany) => {
                for (let speciality of specialities) {
                    if (rawCompany.specialities.includes(speciality)) {
                        return true;
                    }
                }
                return false;
            });
        }

        return result.map((rawCompany) => new ConstructionCompany(rawCompany));
    };
}