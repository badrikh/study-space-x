import axios from "axios";
import { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { Brain, Lightbulb, TrendingUp, Users } from "lucide-react";

const COLORS = ["#3f7bf1", "#8a63f5", "#1abc87"];

const fallbackAnalytics = {
  seatUtilization: {
    chartData: [
      { label: "Morning (8-12)", value: 0 },
      { label: "Afternoon (12-5)", value: 0 },
      { label: "Evening (5-9)", value: 0 },
    ],
    analysis: {
      insight: "Failed to load seat utilization data.",
      recommendation: "Check backend connection or CORS.",
    },
  },
  weeklyDemand: {
    chartData: [
      { day: "Sun", bookings: 0, orders: 0 },
      { day: "Mon", bookings: 0, orders: 0 },
      { day: "Tue", bookings: 0, orders: 0 },
      { day: "Wed", bookings: 0, orders: 0 },
      { day: "Thu", bookings: 0, orders: 0 },
      { day: "Fri", bookings: 0, orders: 0 },
      { day: "Sat", bookings: 0, orders: 0 },
    ],
    analysis: {
      insight: "Failed to load weekly demand data.",
      recommendation: "Check backend connection.",
    },
  },
  coffeePerformance: {
    chartData: {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
    },
    analysis: {
      insight: "Failed to load coffee performance data.",
      recommendation: "Check backend connection.",
    },
  },
};

function buildSmoothPath(points) {
  if (!points.length) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i += 1) {
    const current = points[i];
    const next = points[i + 1];
    const controlX = (current.x + next.x) / 2;
    path += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
  }

  return path;
}

function LineChart({
  labels,
  series,
  leftTicks,
  rightTicks,
  leftMax,
  rightMax,
  footer,
  footerAccent = "",
}) {
  const width = 640;
  const height = 320;
  const left = 72;
  const right = rightTicks ? 48 : 24;
  const top = 18;
  const bottom = 56;
  const innerWidth = width - left - right;
  const innerHeight = height - top - bottom;

  const pointsForSeries = (values, max) =>
    values.map((value, index) => ({
      x: left + (innerWidth / (values.length - 1 || 1)) * index,
      y: top + innerHeight - (value / (max || 1)) * innerHeight,
      value,
    }));

  const normalizedSeries = series.map((item) => ({
    ...item,
    points: pointsForSeries(
      item.data,
      item.axis === "right" ? rightMax : leftMax
    ),
  }));

  return (
    <article className="card ai-chart-card h-100">
      <div className="card-body ai-chart-card-body">
        <div className="ai-chart-title-row">
          <span className={`ai-title-icon ${series[0]?.iconTone || "purple"}`}>
            <TrendingUp size={24} />
          </span>
          <h3 className="ai-chart-title mb-0">{series[0]?.title}</h3>
        </div>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="ai-chart-svg wide"
          aria-hidden="true"
        >
          {leftTicks.map((tick) => {
            const y = top + innerHeight - (tick / (leftMax || 1)) * innerHeight;
            return (
              <g key={`left-${tick}`}>
                <line
                  x1={left}
                  y1={y}
                  x2={width - right}
                  y2={y}
                  className="grid-line"
                />
                <text
                  x={left - 10}
                  y={y + 5}
                  textAnchor="end"
                  className="axis-text"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {labels.map((label, index) => {
            const x = left + (innerWidth / (labels.length - 1 || 1)) * index;
            return (
              <g key={label}>
                <line
                  x1={x}
                  y1={top}
                  x2={x}
                  y2={top + innerHeight}
                  className="grid-line vertical"
                />
                <text
                  x={x}
                  y={height - 12}
                  textAnchor="middle"
                  className="axis-text"
                >
                  {label}
                </text>
              </g>
            );
          })}

          <line
            x1={left}
            y1={top}
            x2={left}
            y2={top + innerHeight}
            className="focus-line"
          />
          <line
            x1={left}
            y1={top + innerHeight}
            x2={width - right}
            y2={top + innerHeight}
            className="focus-line"
          />

          {rightTicks
            ? rightTicks.map((tick) => {
                const y =
                  top + innerHeight - (tick / (rightMax || 1)) * innerHeight;
                return (
                  <text
                    key={`right-${tick}`}
                    x={width - right + 8}
                    y={y + 5}
                    className="axis-text"
                  >
                    {tick}
                  </text>
                );
              })
            : null}

          {normalizedSeries.map((item) => (
            <g key={item.name}>
              <path
                d={buildSmoothPath(item.points)}
                className={`${item.pathClass} ${item.dashed ? "dashed" : ""}`}
              />
              {item.points.map((point, index) => (
                <circle
                  key={`${item.name}-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r="6.5"
                  className={item.pointClass}
                />
              ))}
            </g>
          ))}
        </svg>

        <div className="ai-legend-row">
          {series.map((item) => (
            <span key={item.name} className={`legend-item ${item.legendClass}`}>
              {item.name}
            </span>
          ))}
        </div>

        <p className={`ai-chart-footer ${footerAccent}`}>{footer}</p>
      </div>
    </article>
  );
}

function PieChartCard({ seatData, analysis }) {
  return (
    <article className="card ai-chart-card h-100">
      <div className="card-body ai-chart-card-body">
        <div className="ai-chart-title-row">
          <span className="ai-title-icon green">
            <Users size={24} />
          </span>
          <h3 className="ai-chart-title mb-0">
            Seat Utilization by Time Period
          </h3>
        </div>

        <div className="ai-pie-wrap">
          <div className="ai-pie-chart" />

          <span className="ai-pie-label ai-label-blue">
            {seatData[0]?.label}: {seatData[0]?.value}%
          </span>

          <span className="ai-pie-label ai-label-purple">
            {seatData[1]?.label}: {seatData[1]?.value}%
          </span>

          <span className="ai-pie-label ai-label-green">
            {seatData[2]?.label}: {seatData[2]?.value}%
          </span>
        </div>

        <div className="ai-seat-legend-grid">
          {seatData.map((item, index) => (
            <div className="ai-seat-legend-card" key={item.label}>
              <span
                className="ai-seat-legend-dot"
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="ai-seat-legend-name">{item.label}</span>
              <strong className="ai-seat-legend-value">{item.value}%</strong>
            </div>
          ))}
        </div>

        <p className="ai-chart-footer mt-4">{analysis?.insight}</p>
        <p className="ai-chart-footer green-accent">
          {analysis?.recommendation}
        </p>
      </div>
    </article>
  );
}

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchAnalytics = async () => {
   try {
  const response = await axios.get("http://localhost:3000/ai-analytics");
  console.log("FULL RESPONSE:", response);        // ← أضف هاد
  console.log("RESPONSE DATA:", response.data);   // ← وهاد
  setAnalytics(response.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchAnalytics();
}, []);
 if (loading) {
  return <h1>Loading AI Analytics...</h1>;
}

if (!analytics) {
  return <h1>No analytics data found</h1>;
}

  const seatData = analytics.seatUtilization?.chartData || [];
  const weeklyData = analytics.weeklyDemand?.chartData || [];
  const coffeeData = analytics.coffeePerformance?.chartData || {};

  const weeklyLabels = weeklyData.map((item) => item.day);
  const bookingSeries = weeklyData.map((item) => item.bookings);
  const coffeeSeries = weeklyData.map((item) => item.orders);
  const predictionSeries = bookingSeries.map((value) => Math.round(value * 1.1));

  const maxWeeklyValue = Math.max(
    5,
    ...bookingSeries,
    ...coffeeSeries,
    ...predictionSeries
  );

  const coffeeLabels = ["Revenue", "Orders", "Avg Order"];
  const coffeePerformanceSeries = [
    coffeeData.totalRevenue || 0,
    coffeeData.totalOrders || 0,
    coffeeData.averageOrderValue || 0,
  ];

  const maxCoffeeValue = Math.max(100, ...coffeePerformanceSeries);

  const avgOccupancy =
    seatData.length > 0
      ? Math.round(
          seatData.reduce((sum, item) => sum + Number(item.value || 0), 0) /
            seatData.length
        )
      : 0;

  const totalBookings = bookingSeries.reduce((sum, item) => sum + item, 0);

  const statCards = [
    {
      title: "Avg. Occupancy Rate",
      value: `${avgOccupancy}%`,
      note: "Based on real bookings",
      noteClass: "text-primary",
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      note: "This week",
      noteClass: "text-violet",
    },
    {
      title: "Coffee Orders",
      value: coffeeData.totalOrders || 0,
      note: "From real orders",
      noteClass: "text-warning-custom",
    },
    {
      title: "Avg. Order Value",
      value: `$${coffeeData.averageOrderValue || 0}`,
      note: "Revenue / orders",
      noteClass: "text-success-custom",
    },
  ];

  const insightCards = [
    {
      title: "Seat Utilization Insight",
      body: analytics.seatUtilization?.analysis?.recommendation,
      badge: "AI Advice",
      tone: "yellow",
      icon: Users,
    },
    {
      title: "Weekly Demand Insight",
      body: analytics.weeklyDemand?.analysis?.recommendation,
      badge: "AI Advice",
      tone: "pink",
      icon: TrendingUp,
    },
    {
      title: "Coffee Sales Opportunity",
      body: analytics.coffeePerformance?.analysis?.recommendation,
      badge: "AI Advice",
      tone: "yellow",
      icon: Lightbulb,
    },
  ];

  return (
    <div className="app-bg ai-analytics-page">
      <AdminNavbar />

      <main className="container-fluid admin-shell ai-analytics-shell px-4 px-xl-5 py-5">
        <section className="ai-hero-section">
          <div className="ai-hero-badge">
            <Brain size={30} />
          </div>
          <div>
            <h2 className="ai-hero-title mb-1">AI-Powered Analytics</h2>
            <p className="ai-hero-subtitle mb-0">
              Advanced insights and predictive analysis
            </p>
          </div>
        </section>

        <section className="row g-4 mb-5 ai-stat-row">
          {statCards.map((card) => (
            <div className="col-12 col-md-6 col-xl-3" key={card.title}>
              <article className="card ai-stat-card h-100">
                <div className="card-body ai-stat-card-body">
                  <h3 className="ai-stat-title">{card.title}</h3>
                  <div className="ai-stat-value">{card.value}</div>
                  <div className={`ai-stat-note ${card.noteClass}`}>
                    {card.note}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </section>

        <section className="ai-insights-shell mb-5">
          <div className="ai-section-heading">
            <div className="ai-section-icon">
              <Brain size={28} />
            </div>
            <h2>AI Insights & Recommendations</h2>
          </div>

          <div className="row g-4">
            {insightCards.map((item) => {
              const Icon = item.icon;
              return (
                <div className="col-12 col-lg-6" key={item.title}>
                  <article className={`ai-insight-card ${item.tone}`}>
                    <div className="ai-insight-header">
                      <span className="ai-insight-icon">
                        <Icon size={23} />
                      </span>
                      <h3 className="ai-insight-title">{item.title}</h3>
                    </div>

                    <p className="ai-insight-body mb-3">{item.body}</p>

                    <span className={`priority-badge ${item.tone}`}>
                      {item.badge}
                    </span>
                  </article>
                </div>
              );
            })}
          </div>
        </section>

        <section className="row g-4 mb-4">
          <div className="col-12">
            <PieChartCard
              seatData={seatData}
              analysis={analytics.seatUtilization?.analysis}
            />
          </div>

          <div className="col-12 col-xl-6">
            <LineChart
              labels={weeklyLabels}
              leftTicks={[0, 1, 2, 3, 4, 5, maxWeeklyValue]}
              leftMax={maxWeeklyValue}
              series={[
                {
                  title: "Weekly Demand & Forecast",
                  name: "Bookings",
                  data: bookingSeries,
                  pathClass: "line-blue",
                  pointClass: "point-blue",
                  legendClass: "blue",
                  iconTone: "purple",
                },
                {
                  name: "Coffee Orders",
                  data: coffeeSeries,
                  pathClass: "line-orange",
                  pointClass: "point-orange",
                  legendClass: "orange",
                },
                {
                  name: "AI Prediction",
                  data: predictionSeries,
                  pathClass: "line-purple",
                  pointClass: "point-purple",
                  legendClass: "purple",
                  dashed: true,
                },
              ]}
              footer={analytics.weeklyDemand?.analysis?.recommendation}
            />
          </div>

          <div className="col-12 col-xl-6">
            <LineChart
              labels={coffeeLabels}
              leftTicks={[0, 100, 200, 300, maxCoffeeValue]}
              leftMax={maxCoffeeValue}
              series={[
                {
                  title: "Coffee Shop Performance",
                  name: "Performance",
                  data: coffeePerformanceSeries,
                  pathClass: "line-green",
                  pointClass: "point-green",
                  legendClass: "green",
                  iconTone: "orange",
                },
              ]}
              footer={analytics.coffeePerformance?.analysis?.recommendation}
              footerAccent="green-accent"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
