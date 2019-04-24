import React, { Component } from 'react'
import { List, Avatar ,Rate,Divider} from 'antd'
import "antd/dist/antd.css"
import { Link } from 'react-router-dom'
class MovieList extends Component {
    static defaultProps = {
        dataList: []
    }

    render() {
        return(
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page)
                    },
                    pageSize:this.props.pagesize,
                }}
                dataSource={this.props.dataList}
                renderItem={item => (
                    <Link to={{ pathname : '/detail' , state : { movie: item }}}>
                    <List.Item
                        key={item._id}
                        //actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                        //extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                    >
                        <List.Item.Meta
                            avatar={<img width={150} src={item.poster}  onerror="this.src='empty.png'}"/>}
                            title={<h1>{item.title}</h1>}
                            description={
                                <div>
                                    <span><span>{item.pubdate}</span><span> / </span><span>{item.genres.join(" / ")}</span></span>
                                    <br/>
                                    <p><Rate disabled allowHalf defaultValue={
                                        (item.rating.average*5.0)/10.0 - Math.floor((item.rating.average*5.0)/10.0) > 0.5 ?
                                            Math.floor((item.rating.average*5.0)/10.0) +0.5 :Math.floor((item.rating.average*5.0)/10.0)} /> <span id="score">{item.rating.average}</span>  (评论人数： {item.rating.rating_people})</p>
                                    <p class="summary">{item.summary}</p>
                                </div>}
                        />
                        <Divider/>
                    </List.Item>
                    </Link>
                )}
            />
        )
    }
}
//
export default MovieList