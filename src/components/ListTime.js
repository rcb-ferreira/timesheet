import React, { Component} from 'react';

const styles = {
  active: {
    width: '200px'
  }
}

class ListTime extends Component {
  render() {

    return (
      <ul >
         {this.props.list.map(function(listValue, index){
           return <li key={ index } style={styles.active}>{listValue}</li>;
         })}
       </ul>
    );
  }
}

ListTime.protTypes = {
  list: React.PropTypes.array
}

export default ListTime;
