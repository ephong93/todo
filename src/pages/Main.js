import { Layout, Row, Col, Space, Divider } from 'antd';
import { useState } from 'react';
import ToDoList from '../components/ToDoList';
import DoneList from '../components/DoneList';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;

function Main() {
    const [ inputValue, setInputValue ] = useState('');
    const [ toDoList, setToDoList ] = useState('');
    const [ doneList, setDoneList ] = useState('');

    const changeInputValue = value => {
        setInputValue(value);
    }

    const addToDoItem = value => {
        setToDoList([value, ...toDoList]);
    }

    const addDoneItem = value => {
        setDoneList([value, ...doneList]);
    }

    const completeItem = (value, index) => {
        addDoneItem(value);
        removeToDoItem(index);
    }

    const removeToDoItem = index => {
        setToDoList(toDoList.filter((_value, _index) => _index !== index));
    }

    const removeDoneItem = index => {
        setDoneList(doneList.filter((_value, _index) => _index !== index));
    }

    const restoreItem = (value, index) => {
        addToDoItem(value);
        removeDoneItem(index);
    }

    const changeToDoItem = (value, index) => {
        setToDoList([...toDoList.slice(0, index), value, ...toDoList.slice(index+1)]);
    }

    const changeDoneItem = (value, index) => {
        setDoneList([...doneList.slice(0, index), value, ...doneList.slice(index+1)]);
    }

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
                        }}/>
                        <RightOutlined style={{
                            position: 'absolute',
                            top: '200px',
                            right: '-30px',
                            zIndex: 1,
                            cursor: 'pointer'
                        }}/>
                        <Space direction='vertical' size='large' style={{width: '100%'}}>
                            <div>
                                <Divider orientation='left'>To do</Divider>
                                <ToDoList
                                    itemList={toDoList}
                                    inputValue={inputValue}
                                    changeInputValue={changeInputValue}
                                    addToDoItem={addToDoItem}
                                    completeItem={completeItem}
                                    removeToDoItem={removeToDoItem}
                                    changeToDoItem={changeToDoItem}
                                >
                                </ToDoList>
                            </div>
                            <div>
                                <Divider orientation='left'>Done</Divider>
                                <DoneList
                                    itemList={doneList}
                                    removeDoneItem={removeDoneItem}
                                    restoreItem={restoreItem}
                                    changeDoneItem={changeDoneItem}
                                >
                                </DoneList>
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