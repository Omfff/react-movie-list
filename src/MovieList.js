import React, { Component } from 'react'
import { List, Avatar ,Rate,Divider,Pagination} from 'antd'
import "antd/dist/antd.css"
import { Link } from 'react-router-dom'
class MovieList extends Component {
    static defaultProps = {
        dataList: []
    }
    constructor(props) { //构造函数
        console.log("movie list constructor")
        super(props);
        this.state = {
            itemList: {},
            basicPath :this.props.path,
            totalPage:0
        }
        this.onPageChange = this.onPageChange.bind(this)
    }
    componentWillMount() {
        console.log("movie list componentWillMount")
        let request = new Request(this.state.basicPath+'1', {
                method: 'GET',
            }
        )
        this.fetchData(request)
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("state total page",this.state.totalPage,"nextstate:",nextState.totalPage)
        return true
    }

    componentWillReceiveProps (nextProps){
        console.log("movie list componentWillReceiveProps")
        //this.setState({itemList:nextProps.dataList})
        let request = new Request(nextProps.path+'1', {
                method: 'GET',
            }
        )
        this.fetchData(request)
    }
    onPageChange(pageNumber) {
        console.info("getData")
        let request = new Request(this.state.basicPath+pageNumber, {
                method: 'GET',
            }
        )
        this.fetchData(request)
    }
    fetchData(request){
        console.log(request)
        fetch(request)//'./films.json')
            .then(response => response.json())
            .then(data =>this.setState({itemList:this.handleJson(data.list),totalPage:data.total}))
    }
    componentWillUnmount() {
        console.log("movie list componentWillUnmount")
    }

    handleJson(jsonList){
        for(let item of jsonList){
            item["rating"] = JSON.parse(item.rating)
            item["genres"] = JSON.parse(item.genres)
            item["countries"] = JSON.parse(item.countries)
            item["casts"] = JSON.parse(item.casts)
            item["directors"] = JSON.parse(item.directors)
            item["pubdate"] = JSON.parse(item.pubdate)
        }

        return jsonList
    }

    render() {
        console.log("movielist render")
        if(this.state.totalPage!=0) {
            return (
                <div>
                    <List
                        itemLayout="vertical"
                        size="large"
                        /*pagination={{
                            onChange: (page) => {
                                console.log(page)
                            },
                            pageSize:this.props.pagesize,
                        }}*/
                        dataSource={this.state.itemList}
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
                    <Pagination showQuickJumper defaultCurrent={1} total={this.state.totalPage}
                                onChange={this.onPageChange}/>
                </div>
            )
        }else{
            return (<div></div>)
        }
    }
}
//
export default MovieList