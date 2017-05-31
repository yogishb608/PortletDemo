import React, { Component } from 'react';
var data =
    {
        // "Section1": [
        //     {
        //         "name": "Chapter1",
        //         "page_no": "13",
        //     }
        // ],
        // "Section2": [
        //     {
        //         "name": "Chapter3",
        //         "page_no": "43",
        //     }
        // ]
    }
class Portal2 extends Component{

    constructor(props){
        super(props);
        this.state={
            fname:''
        }
    }

    addElement(){
        // console.log(Object.keys(data).indexOf('Section2'))
        var sec = document.getElementById('section_add').value;
        var chapter = document.getElementById('chapter_add').value;
        var pno = document.getElementById('page_no_add').value;
        var m = [{"name":chapter,"page_no":pno}]
        data[sec]=m;
        localStorage.setItem("firstName",JSON.stringify(data))
        this.showElement()
    }

    ComponentDidMount(){
            // localStorage.setItem("firstName",JSON.stringify(data))
    }

    showElement(){
        this.setState({fname:JSON.parse(localStorage.getItem("firstName"))});
    }

    editElement(i){
        var k = Object.keys(data)
        // var isec = i+"section";
        var ichap = i+"chapter";
        var ipno = i+"page_no";
        // var sec = document.getElementById(isec).value;
        var chapter = document.getElementById(ichap).value;
        var pno = document.getElementById(ipno).value;
        var m = [{"name":chapter,"page_no":pno}]

        // console.log(k[i])
        data[k[i]]=m;
        localStorage.setItem("firstName",JSON.stringify(data))
        this.showElement()
    }

    deleteElement(i){
        // console.log(i)
        // console.log(data)
        var k = Object.keys(data)
        // console.log(k[i])
        delete data[k[i]]
        localStorage.setItem("firstName",JSON.stringify(data))
        this.showElement()
    }

    render(){
        return(
            <div className="cardJson">
                    <center><h2>Local Storage</h2></center>
                    <button onClick={this.showElement.bind(this)}>show</button>
                    <div className="name">{Object.values(this.state.fname).map(function (data,index) {
                        return(
                            <div key={index}>
                                <input type="text" id={index+"section"} placeholder="section" defaultValue={Object.keys(this.state.fname)[index]}></input>
                                {data.map(function (data) {
                                   return(
                                            <span key={index}>
                                                <input defaultValue={data.name} type="text" id={index+"chapter"} placeholder="chapter"></input>
                                                {/*{data.name+":"+ data.page_no}<br/>*/}
                                                <input defaultValue={data.page_no} type="text" id={index+"page_no"} placeholder="page_no"></input>
                                            </span>
                                       )
                                })}
                                <br/>
                                <button id={index+"edit"} onClick={this.editElement.bind(this,index)}>Save</button>
                                <button id={index+"delete"} onClick={this.deleteElement.bind(this,index)}>Delete</button>
                                <br/>
                            </div>
                        )
                    },this)}</div>

                <br/>
                <input type="text" id="section_add" placeholder="Section" ></input>
                <input type="text" id="chapter_add" placeholder="Chapter" ></input>
                <input type="text" id="page_no_add" placeholder="Page No" ></input><br/>
                <button onClick={this.addElement.bind(this)}>add</button>

            </div>
        )
    }
}

export default Portal2;
