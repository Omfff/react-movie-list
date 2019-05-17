import React, { Component } from 'react'
import { List, Avatar ,Rate,Divider,Pagination} from 'antd'
import "antd/dist/antd.css"
import { Link } from 'react-router-dom'
import {changePage,fetchData} from "./redux.js"
import {connect} from "react-redux";
class MovieList extends Component {
    static defaultProps = {
        dataList: []
    }
    constructor(props) { //构造函数
        console.log("movie list constructor")
        super(props)
        console.log(this.props.path)
        this.state = {
            basicPath :this.props.basicPath
        }
        this.onPageChange = this.onPageChange.bind(this)
    }
    componentWillMount() {
        console.log("movie list componentWillMount")
        console.log(typeof this.props.basicPath)
        let url = this.props.basicPath +this.props.pageNum
        console.log(url)
        let request = new Request(url, {
                method: 'GET',
            }
        )
        this.props.fetchData(request)
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true
    }

    onPageChange(pageNumber) {
        console.info("getData")
        let request = new Request(this.props.basicPath+pageNumber, {
                method: 'GET',
            }
        )
        this.props.changePage(pageNumber)
        this.props.fetchData(request)

    }
    componentWillUnmount() {
        console.log("movie list componentWillUnmount")
    }


    render() {
        console.log("movielist render")
        const pages = this.props.total
        if(this.props.total!=0) {
            return (
                <div>
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={this.props.itemList}
                        renderItem={item => (
                            <Link to={{pathname: '/detail', state: {movie: item}}}>
                                <List.Item
                                    key={item._id}
                                    //actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                                    //extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                                >
                                    <List.Item.Meta
                                        avatar={<img width={150} src={item.poster} onError="this.src='empty.png'"/>}
                                        title={<h1>{item.title}</h1>}
                                        description={
                                            <div>
                                                <span><span>{item.pubdate[0]}</span><span> / </span><span>{item.genres.join(" / ")}</span></span>
                                                <br/>
                                                <p><Rate disabled allowHalf defaultValue={
                                                    (item.rating.average * 5.0) / 10.0 - Math.floor((item.rating.average * 5.0) / 10.0) > 0.5 ?
                                                        Math.floor((item.rating.average * 5.0) / 10.0) + 0.5 : Math.floor((item.rating.average * 5.0) / 10.0)}/>
                                                    <span
                                                        id="score">{item.rating.average}</span> (评论人数： {item.rating.rating_people})
                                                </p>
                                                <p class="summary">{item.summary}</p>
                                            </div>}
                                    />
                                    <Divider/>
                                </List.Item>
                            </Link>
                        )}
                    />
                    <Pagination showQuickJumper defaultCurrent={this.props.pageNum} total={pages}
                                onChange={this.onPageChange}/>
                </div>
            )
        }else{
            return (<div></div>)
        }
    }
}
const mapStateToProps=(state)=>{
    console.log("movie list mapStateToProps")
    console.log(state)
    return state
}
const mapDispatchToProps = {changePage,fetchData}
MovieList = connect(mapStateToProps,mapDispatchToProps)(MovieList)
export default MovieList