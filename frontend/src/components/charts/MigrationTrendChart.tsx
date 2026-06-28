import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2018", migrants: 350000 },
  { year: "2019", migrants: 400000 },
  { year: "2020", migrants: 150000 },
  { year: "2021", migrants: 200000 },
  { year: "2022", migrants: 450000 },
  { year: "2023", migrants: 750000 },
  { year: "2024", migrants: 850000 },
];

export function MigrationTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="hsl(var(--border))"
        />
        <XAxis
          dataKey="year"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderRadius: "8px",
            border: "1px solid hsl(var(--border))",
          }}
          itemStyle={{ color: "hsl(var(--foreground))" }}
          formatter={(value) => [
            new Intl.NumberFormat().format(Number(value ?? 0)),
            "Migrants",
          ]}
        />
        <Line
          type="monotone"
          dataKey="migrants"
          stroke="hsl(var(--accent))"
          strokeWidth={3}
          dot={{ r: 4, fill: "hsl(var(--background))", strokeWidth: 2 }}
          activeDot={{ r: 6, strokeWidth: 0, fill: "hsl(var(--primary))" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
