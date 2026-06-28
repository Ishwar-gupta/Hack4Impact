import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { country: "UAE", migrants: 210000 },
  { country: "Qatar", migrants: 180000 },
  { country: "Saudi", migrants: 160000 },
  { country: "Malaysia", migrants: 120000 },
  { country: "USA", migrants: 45000 },
  { country: "Australia", migrants: 40000 },
];

export function TopDestinationsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={false}
          stroke="hsl(var(--border))"
        />
        <XAxis
          type="number"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <YAxis
          dataKey="country"
          type="category"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={60}
        />
        <Tooltip
          cursor={{ fill: "hsl(var(--secondary))" }}
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            borderRadius: "8px",
            border: "1px solid hsl(var(--border))",
          }}
          formatter={(value) => [
            new Intl.NumberFormat().format(Number(value ?? 0)),
            "Migrants",
          ]}
        />
        <Bar dataKey="migrants" radius={[0, 4, 4, 0]} barSize={24}>
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                index < 3 ? "hsl(var(--destructive))" : "hsl(var(--primary))"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
