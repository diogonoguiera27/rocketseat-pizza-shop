import { BarChart, Loader2 } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import colors from "tailwindcss/colors";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPopularProducts } from "@/api/get-popular-products";
import { useQuery } from "@tanstack/react-query";

const COLORS = [
  colors.sky[500],
  colors.amber[500],
  colors.violet[500],
  colors.emerald[500],
  colors.rose[500],
];

export function PopularProductsChart() {
  const { data: popularProducts, isLoading } = useQuery({
    queryKey: ["metrics", "popular-products"],
    queryFn: getPopularProducts,
    refetchOnMount: true,
  });

  const sanitizedData = [...(popularProducts ?? [])]
    .map((p) => ({
      ...p,
      amount: Number(p.amount),
    }))
    .filter((p) => !isNaN(p.amount) && p.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const topProducts = sanitizedData.slice(0, 4);
  const otherProducts = sanitizedData.slice(4);
  const totalOthers = otherProducts.reduce((sum, p) => sum + p.amount, 0);

  const chartData = [
    ...topProducts,
    ...(totalOthers > 0 ? [{ product: "Outros", amount: totalOthers }] : []),
  ];

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populares
          </CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart style={{ fontSize: 12 }}>
              <Pie
                data={chartData}
                nameKey="product"
                dataKey="amount"
                cx="50%"
                cy="50%"
                outerRadius={86}
                innerRadius={64}
                strokeWidth={8}
                labelLine={false}
                label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 12 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      className="fill-muted-foreground text-xs"
                      textAnchor={x > cx ? "start" : "end"}
                      dominantBaseline="central"
                    >
                      {chartData[index].product.length > 12
                        ? chartData[index].product.substring(0, 12) + "..."
                        : chartData[index].product}{" "}
                      ({value})
                    </text>
                  );
                }}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${chartData[index].product}-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="stroke-background hover:opacity-80"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
