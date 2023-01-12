import { Container } from '@mui/system';
import React from 'react';
import {
  XAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ExchangeResultChart = ({ rateHistory, base }) => {
  const rateChartData = [];

  for (const key in rateHistory) {
    rateChartData.push({
      date: key,
      rate: rateHistory[key][base],
    });
  }

  return (
    <Container>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={rateChartData}
          margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
        >
          <CartesianGrid stroke="#fff" strokeDasharray="1 1" />
          <XAxis
            tick={{ fontSize: 12 }}
            dataKey="date"
            textAnchor="end"
            sclaeToFit="true"
            verticalAnchor="start"
            interval={0}
            angle="-90"
            stroke="#8884d8"
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="rate" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default ExchangeResultChart;
