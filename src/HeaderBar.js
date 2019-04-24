import { Component } from 'react'
import {Menu,Layout,Input,Select}  from 'antd'
import React from  'react'
const Header = Layout
const Search = Input.Search;
const Option = Select.Option;
var searchType = 'title'

class HeaderBar extends Component{
    constructor(){
        super()
        this.state={
            searchType:'title'
        }
    }
    handleSearch(value){
        if(this.props.onSubmit){
            if(value!=null && value !== '') {
                const content = value
                this.props.onSubmit(content,searchType)
            }
        }
    }
    handleChange(value){
        searchType=value
    }
    render() {
        const selectBefore = (
            <Select defaultValue="按标题" style={{ width: 100 }} onChange={this.handleChange}>
                <Option value="title">按标题</Option>
                <Option value="summary">按简介</Option>
                <Option value="actor">按演员</Option>
                <Option value="time" >按时间</Option>
            </Select>
        );
        return(
            <Header>
                <div className="logo" />
                <p class="pageTitle">电影列表</p>
                <div>
                <Search
                    addonBefore={selectBefore}
                    placeholder="请输入搜索关键字"
                    enterButton="Search"
                    size="large"
                    onSearch={value=>this.handleSearch(value)}
                />

                </div>
            </Header>
        )
    }
}
export default HeaderBar