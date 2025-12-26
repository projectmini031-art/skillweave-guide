import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface GapData {
  skill: string;
  current: number;
  gap: number;
}

interface SkillGapBarChartProps {
  data: GapData[];
}

const SkillGapBarChart = ({ data }: SkillGapBarChartProps) => {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" barGap={4}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            type="category"
            dataKey="skill"
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              boxShadow: "var(--shadow-lg)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Legend
            formatter={(value) => (
              <span className="text-sm text-foreground">{value}</span>
            )}
          />
          <Bar
            dataKey="current"
            name="Current Level"
            stackId="a"
            fill="hsl(var(--primary))"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="gap"
            name="Gap to Fill"
            stackId="a"
            radius={[0, 4, 4, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.gap > 30
                    ? "hsl(var(--destructive))"
                    : entry.gap > 15
                    ? "hsl(var(--warning))"
                    : "hsl(var(--accent))"
                }
                fillOpacity={0.6}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillGapBarChart;
