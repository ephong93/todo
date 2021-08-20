import { Layout, Row, Col, Carousel, Button } from 'antd';
import { useRef } from 'react';
import ItemList from '../components/ItemList';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import UserContext from '../UserContext';

const { Header, Content } = Layout;

function Main() {
    const carouselRef = useRef(null);
    return <UserContext.Consumer>
        {({user, logout}) => 
            <Layout>
                <Header>
                    Hi, {user}!
                    <Button onClick={logout}>로그아웃</Button>
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
        }
    </UserContext.Consumer>
    
}

export default Main;