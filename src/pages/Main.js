import { Layout, Row, Col, Space, Divider, Input } from 'antd';
import { useState } from 'react';
import ItemList from '../components/ItemList';

const { Header, Content } = Layout;

const toDoDataDummy = [
    '저녁 만들기',
    '장 보기',
    '청소하기'
];

const doneDataDummy = [
    '운동하기',
    '설거지하기'
];

function Main() {
    return (
        <>
        <Layout>
            <Header>
                header
            </Header>
            <Content>
                <Row>
                    <Col span={12} offset={6}>
                        <Space direction='vertical' size='large' style={{width: '100%'}}>
                            <div>
                                <Divider orientation='left'>To do</Divider>
                                <ItemList data={toDoDataDummy}>
                                </ItemList>
                            </div>
                            <div>
                                <Divider orientation='left'>Done</Divider>
                                <ItemList data={doneDataDummy}>
                                </ItemList>
                            </div>
                        </Space>
                    </Col>
                </Row>
            </Content>
        </Layout>
        </>
    )
}

export default Main;