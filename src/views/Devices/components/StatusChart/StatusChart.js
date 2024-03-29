import React from 'react';
import {Line} from 'react-chartjs-2';
import PropTypes from 'prop-types';

const StatusChart = props => {
  const { data, statusTitle } = props;
  return (
    <div>
      <Line
        height={100}
        data={data}
        options={{
          title:{
            display:true,
            text: statusTitle,
            fontSize:20
          },
          legend:{
            display:false,
            position:'right'
          }
        }}
      />
    </div>
  );
}

StatusChart.propTypes = {
  data: PropTypes.object.isRequired,
  statusTitle: PropTypes.string.isRequired
};

export default StatusChart;
