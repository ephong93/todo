import { Layout, Row, Col, Carousel } from 'antd';
import { useRef } from 'react';
import ItemList from '../components/ItemList';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

function Main() {
    const carouselRef = useRef(null);

    return (
        <>
        <Layout>
            <Header>
                header
            </Header>
            <Content>
                <Row>
                    <Col span={12} offset={6}>
                        <LeftOutlined style={{
                            position: 'absolute',
                            top: '200px',
                            left: '-30px',
                            zIndex: 1,
                            cursor: 'pointer'
                        }}
                            onClick={() => carouselRef.current.prev()}
                        />
                        <RightOutlined style={{
                            position: 'absolute',
                            top: '200px',
                            right: '-30px',
                            zIndex: 1,
                            cursor: 'pointer'                        
                        }}
                            onClick={() => carouselRef.current.next()}
                        />
                        <Carousel ref={carouselRef}>
                            <ItemList />
                            <ItemList />
                            <ItemList />
                        </Carousel>
                    </Col>
                </Row>
            </Content>
        </Layout>
        </>
    )
}

export default Main;