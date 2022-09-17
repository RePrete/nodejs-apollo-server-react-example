import {useQuery, gql} from '@apollo/client';
import {Checkbox, Collapse, Divider, Form, Image, Input, Row, Table, Tag} from "antd";
import {useState} from "react";

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
      render: (_, {logoUrl}) => (
        <Image src={logoUrl} width={64} height={64} ></Image>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, {name}) => <h2>{name}</h2>
    },
    {
      title: 'Specialities',
      dataIndex: 'specialities',
      key: 'specialities',
      render: (_, {specialities}) => {
        specialities.slice().sort()
        return specialities.map(speciality => (
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
            companySpecialitiesEnum.data.__type.enumValues.map((item) => {
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