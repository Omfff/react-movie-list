import { Component } from 'react'
import React from  'react'
import {Divider, Layout} from 'antd'
import "antd/dist/antd.css"
const Footer = Layout

class FooterBar extends Component{
    render() {
        return(
            <Footer id="foot" style={{ textAlign: 'center' ,color:"gray"}}>
                <Divider><span id="footer">Movie List ©2019 Created by Mingfeng Ou</span></Divider>
            </Footer>
        )
    }
}
export default FooterBar