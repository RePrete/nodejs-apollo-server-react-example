import React from 'react';
import {useState} from "react";
import {useQuery, gql} from '@apollo/client';
import ConstructionCompany from "./Domain/CostructionCompanyModel";
import GraphqlEnumType from "./Domain/BaseModel";
import {Checkbox, Divider, Form, Image, Input, Table, Tag} from "antd";

const GET_CONSTRUCTION_COMPANIES = gql`
  query ConstructionCompanies($filters: ConstructionCompanyFilters) {
    ConstructionCompanies(filters: $filters) {
      uuid
      name
      logoUrl
      specialities
      city
    }
  }
`;

const ENUMERATE_CONSTRUCTION_SPECIALITY = gql`
  query {
    __type(name: "ConstructionSpeciality") {
      enumValues {
        name
      }
    }
  }
`;

const ConstructionCompanyList = () => {
  const [selectedSpecialities, setSelectedSpecialities] = useState([])
  const constructionCompanies = useQuery(GET_CONSTRUCTION_COMPANIES);
  const companySpecialitiesEnum = useQuery(ENUMERATE_CONSTRUCTION_SPECIALITY);
  const columns = [
    {
      title: '',
      dataIndex: 'logoUrl',
      key: 'logoUrl',
      width: 64,
      render: (_: any, item: ConstructionCompany) => (
        <Image src={item.logoUrl} width={64} height={64} ></Image>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, item: ConstructionCompany) => <h2>{item.name}</h2>
    },
    {
      title: 'Specialities',
      dataIndex: 'specialities',
      key: 'specialities',
      render: (_: any, item: ConstructionCompany) => {
        item.specialities.slice().sort()
        return item.specialities.map(speciality => (
          <Tag key={speciality} color={selectedSpecialities?.includes(speciality) ? "#265ac9" : ""}>
            {speciality.toLowerCase()}
          </Tag>
        ))
      },
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    }
  ];

  if (constructionCompanies.loading || companySpecialitiesEnum.loading) return <div></div>
  if (constructionCompanies.error) return <p>Error :(</p>;

  return <div>
    <Form
      name="filters"
      layout="inline"
      onValuesChange={(changedValues, allValues) => {
        setSelectedSpecialities(allValues.specialities);
        constructionCompanies.refetch({
          filters: {
            name: allValues.name,
            specialities: allValues.specialities
          }
        })
      }}
    >
      <Form.Item name="name" label="Company name" >
        <Input.Search  placeholder="Name" enterButton={false} />
      </Form.Item>
      <Form.Item name="specialities" label="Available specialities">
        <Checkbox.Group>
          {
            companySpecialitiesEnum.data.__type.enumValues.map((item: GraphqlEnumType) => {
              return <Checkbox key={item.name} value={item.name}>{item.name.toLowerCase()}</Checkbox>
            })
          }
        </Checkbox.Group>
      </Form.Item>
    </Form>
    <Divider />
    <Table
      pagination={false}
      dataSource={constructionCompanies.data.ConstructionCompanies}
      columns={columns}
    />
  </div>;
}

export default ConstructionCompanyList;