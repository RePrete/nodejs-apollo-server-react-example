import { Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

const Homepage = () => {
    return <div>
        <Title level={2}>Welcome to Cosuno tech challange</Title>
        <Paragraph>
            This is a simple SPA with only a single real working page.
            You can find it navigating using the side menu.
        </Paragraph>
    </div>
}

export default Homepage;