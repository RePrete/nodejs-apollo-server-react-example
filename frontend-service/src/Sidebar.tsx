import {ItemType} from "antd/lib/menu/hooks/useItems";
import {Link} from "react-router-dom";
import React from "react";
import {Layout, Menu} from "antd";
const {Sider} = Layout;

const menuItems: ItemType[] = [
    {
        key: "companies",
        label: "Companies",
        children: [
            {
                key: "by-specialities",
                label: <Link to={"/companies/by-speciality"}>By specialities</Link>
            }
        ]
    }
];

class Sidebar extends React.Component {
    render() {
        return <Sider className="site-layout-background" width={200}>
            <Menu
                mode="inline"
                defaultSelectedKeys={["companies-specialities"]}
                defaultOpenKeys={["companies"]}
                style={{height: "100%"}}
                items={menuItems}
            />
        </Sider>;
    }
}

export default Sidebar;