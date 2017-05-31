import React, { Component } from 'react';
import Infinite from 'react-infinite';

class Portal1 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            gitData: '',
            no_repo: 10,
            isInfiniteLoading:false
        }

        this.loadMoreData = this.loadMoreData.bind(this)
    }

    componentWillMount() {
        fetch('https://api.github.com/users/addyosmani/repos?page=1&per_page=10')
            .then(d=>d.json())
            .then(d=>{
                this.setState({
                    gitData:d
                })
            })
    }


    loadMoreData() {
        // console.log('loading')
        this.setState({isInfiniteLoading:true})
        this.setState({ no_repo: this.state.no_repo + 10 })
        // console.log(this.state.no_repo)
        fetch('https://api.github.com/users/addyosmani/repos?page=1&per_page=' + this.state.no_repo)
            .then(d => d.json())
            .then(d => {
                this.setState({
                    gitData: this.state.gitData.concat(d),
                    isInfiniteLoading:false
                })
            })

    }

    render() {

        var userInfo = this.state.gitData;

        return (
            <div className="card">
                <center><h2>Github Feed</h2></center>
                {
           			<Infinite elementHeight={80}
           				 containerHeight={380}
                         infiniteLoadBeginEdgeOffset={200}
                         onInfiniteLoad={this.loadMoreData.bind(this)}
                         isInfiniteLoading={this.state.isInfiniteLoading}
                         >
                          {Object.values(userInfo).map(function (data,index) {
	                    return (
	                        <div key={index}>
	                           <p>Name : {data.name}</p>
	                            <p>Forks : {data.forks}</p>
	                            <p>Description : {data.description}</p>
	                            <p>Stars : {data.stargazers_count}</p>
	                            <p>Language : {data.language}</p>
	                            <p>Watchers : {data.watchers}</p>
	                            <p>Homepage : <a href={data.homepage}>{data.homepage}</a></p>
	                            <hr/>
	                        </div>
	                    )
	                })}
	        </Infinite>    
	              }

            </div>
        )
    }
}

export default Portal1;
