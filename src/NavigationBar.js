import { Menu, Icon } from 'antd'
import { Component } from 'react'
import React from  'react'
import { Link } from 'react-router-dom'

class NavigationBar extends Component{
    state = {
        current: 'home',
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item key="home">
                    <Link to='/'><Icon type="mail" />HomePage</Link>
                </Menu.Item>
                <Menu.Item key="analysis" >
                    <Link to='/analysis'><Icon type="appstore" />AnalysisPage</Link>
                </Menu.Item>
            </Menu>
        );
    }
}
export default NavigationBar