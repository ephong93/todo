import { Row, Col, Carousel } from 'antd';
import { useRef, useState } from 'react';
import ItemList from '../components/ItemList';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const getDates = (date, carouselCurrent) => {
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
    return dates;
}


function Main() {
    const [ date, setDate ] = useState({year: 2021, month: 8, day: 22});
    const [ carouselCurrent, setCarouselCurrent ] = useState(0);

    const dates = getDates(date, carouselCurrent);

    const carouselRef = useRef(null);
    return (
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
    )
}

export default Main;