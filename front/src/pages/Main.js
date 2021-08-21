import { Layout, Row, Col, Carousel, Button } from 'antd';
import { useRef, useState } from 'react';
import ItemList from '../components/ItemList';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import UserContext from '../UserContext';

const { Header, Content } = Layout;

function Main() {
    const [ date, setDate ] = useState({year: 2021, month: 8, day: 22});
    const [ carouselCurrent, setCarouselCurrent ] = useState(0);

    const dates = [null, null, null];
    const _date = new Date(date.year, date.month-1, date.day);
    dates[carouselCurrent] = {
        year: _date.getFullYear(),
        month: _date.getMonth()+1,
        day: _date.getDate()
    };
    _date.setDate(_date.getDate() + 1);
    dates[(carouselCurrent+1) % 3] = {
        year: _date.getFullYear(),
        month: _date.getMonth()+1,
        day: _date.getDate()
    };
    _date.setDate(_date.getDate() - 2);
    dates[(carouselCurrent+2) % 3] = {
        year: _date.getFullYear(),
        month: _date.getMonth()+1,
        day: _date.getDate()
    };

    console.log(dates);

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
                                onClick={() => {
                                    carouselRef.current.prev();
                                    setCarouselCurrent((carouselCurrent+2) % 3);
                                    const _date = new Date(date.year, date.month-1, date.day);
                                    _date.setDate(_date.getDate()-1);
                                    setDate({
                                        year: _date.getFullYear(),
                                        month: _date.getMonth()+1,
                                        day: _date.getDate()
                                    });
                                }}
                            />
                            <RightOutlined style={{
                                position: 'absolute',
                                top: '200px',
                                right: '-30px',
                                zIndex: 1,
                                cursor: 'pointer'                        
                            }}
                                onClick={() => {
                                    carouselRef.current.next()
                                    setCarouselCurrent((carouselCurrent+1) % 3);
                                    const _date = new Date(date.year, date.month-1, date.day);
                                    _date.setDate(_date.getDate()+1);
                                    setDate({
                                        year: _date.getFullYear(),
                                        month: _date.getMonth()+1,
                                        day: _date.getDate()
                                    });
                                }}
                            />
                            <Carousel ref={carouselRef}>
                                <ItemList date={dates[0]} />
                                <ItemList date={dates[1]} />
                                <ItemList date={dates[2]} />
                            </Carousel>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        }
    </UserContext.Consumer>
    
}

export default Main;