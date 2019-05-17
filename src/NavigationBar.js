import { Menu, Icon } from 'antd'
import { Component } from 'react'
import React from  'react'
import { Link } from 'react-router-dom'
import {backToHomePage, changePage, fetchData} from './redux'
import {connect} from "react-redux";
import MovieList from "./MovieList";

class NavigationBar extends Component{
    state = {
        current: 'home',
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
        if(e.key =="home"){
            this.props.backToHomePage()
            let request = new Request('http://47.107.167.12:8080/api/movies/page/'+'1', {
                    method: 'GET',
                }
            )
            this.props.fetchData(request)
        }

    }

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item key="home" >
                    <Link to='/'><Icon type="mail" />HomePage</Link>
                </Menu.Item>
                <Menu.Item key="analysis" >
                    <Link to='/analysis'><Icon type="appstore" />AnalysisPage</Link>
                </Menu.Item>
            </Menu>
        );
    }
}
const mapStateToProps=(state)=>{
    return state
}
const mapDispatchToProps = {fetchData,backToHomePage}
NavigationBar = connect(mapStateToProps,mapDispatchToProps)(NavigationBar)
export default NavigationBar