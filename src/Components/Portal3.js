import React, { Component } from 'react';
import { VictoryBar, VictoryChart } from 'victory';
var $ = require('jquery');
var percentmale,percentfemale,percentlatino,percentus;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gitData1: [],
            gitData2: '',
            isData: false,
            data: [],
        }
        this.GenerateChart = this.GenerateChart.bind(this)
    }

    GenerateChart() {
        var self = this;
        self.setState({ isData: false })
        $.ajax({
            dataType: 'json',
            type: "GET",
            url: 'https://data.cityofnewyork.us/api/views/kku6-nxdu/rows.json?accessType=DOWNLOAD',

            beforeSend: function(request) {

            },
            success: function(response) {
                // console.log(response)
                // console.log('response')
                    // console.log(response.meta.view)
                self.setState({ gitData2: response.meta.view.columns })
                // console.log('pr')
                self.state.gitData2.map(function(data) {
                    return (
                        data.fieldName === "percent_male"?
                          percentmale = parseInt(data.cachedContents.sum)
                        :
                        data.fieldName === "percent_female"?
                          percentfemale = parseInt(data.cachedContents.sum)
                        :
                        data.fieldName === "percent_hispanic_latino"?
                          percentlatino = parseInt(data.cachedContents.sum)
                        :
                        data.fieldName ==="percent_us_citizen"?
                          percentus = parseInt(data.cachedContents.sum)
                        :  
                          null
                    )
                })
             self.setState({ isData: true })
            }

        });

    }

    render() {
        return (
            <div className="card">
                   <center><h2>Bar Chart</h2></center>   
                 <button onClick={this.GenerateChart.bind(this)}>Generate</button>
                        {this.state.isData?
                            <VictoryChart domainPadding={20}>
                            <VictoryBar
                              data={[
                                  {data1: "Male(%)", data2: percentmale},
                                  {data1: "Female(%)", data2: percentfemale},
                                  {data1: "Latino(%)", data2: percentlatino},
                                  {data1: "US(%)", data2: percentus},
                                  
                                ]}
                              x="data1"
                              y="data2"
                            />
                            </VictoryChart>
                          :
                          null
                        }
            </div>
        );
    }
}

export default App;
