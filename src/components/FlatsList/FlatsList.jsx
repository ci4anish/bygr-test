import React from "react";
import Select from 'react-select';
import "./FlatsList.css"

import {FlatItem} from '../index';

class FlatsList extends React.Component {
  state = {
    env: 'http://localhost:3000/',
    data: [],
    filteredData: [],
    options: [],
    floors: [{ label: 'Floor 1', value: 1 }, { label: 'Floor 2', value: 2 }],
    selectedFlatType: null,
    selectedFloor: null,
  };

  componentDidMount() {
    this.getData();
  }

  getOptions = data => {
    return data.map(item => {
      return {value: item['layoutType'], label: item['layoutType']};
    });
  };

  filterByFloor = selectedFloor => {
    this.setState({selectedFloor, selectedFlatType: null});
    this.getData(selectedFloor ? selectedFloor.value : null);
  }

  filterFlatsList = selectedFlatType => {
    const {data} = this.state;

    if (!selectedFlatType) this.setState({filteredData: data, selectedFlatType});
    else {
      const editedData = data.filter(item => item['layoutType'] === selectedFlatType.value);
      this.setState({filteredData: editedData, selectedFlatType});
    }
  };

  getData(floor) {
    let url = '/buyer-info';

    if(floor) {
      url += '?floor=' + floor;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({data: data, options: this.getOptions(data), filteredData: data});
      });
  }

  render() {
    const {options, selectedFlatType, filteredData, floors, selectedFloor} = this.state;

    return (
      <div className="flat-list">
        <div className="d-flex">
          <Select
            className="select"
            value={selectedFloor}
            onChange={this.filterByFloor}
            placeholder="Filter by floor"
            isClearable
            options={floors}
          />
          <Select
            className="select"
            value={selectedFlatType}
            onChange={this.filterFlatsList}
            placeholder="Filter by type"
            isClearable
            options={options}
          />
        </div>
        <div className="list">
          {filteredData.map((item, index) => <FlatItem flat={item} key={index}/>)}
        </div>
      </div>
    )
  }
}

export {FlatsList};
