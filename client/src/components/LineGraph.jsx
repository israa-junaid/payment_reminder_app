import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";

const LineGraph = ({ data }) => {
  return (
    <div className="py-6 px-3 rounded-md  bg-white">
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          data={data}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="1%" stopColor="#129a74" stopOpacity={0.1} />
              <stop offset="99%" stopColor="#FFFFFF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="0" strokeDasharray="0 0" />
          <XAxis dataKey="month" dy={10} />
          <YAxis dataKey="value" />

          <Area
            type="monotone"
            dataKey="value"
            stroke={false}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Line
            type="monotone"
            dataKey="value"
            fill="url(#colorUv)"
            strokeWidth={2}
            stroke="#72AF3A"
            activeDot={{ r: 8 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
