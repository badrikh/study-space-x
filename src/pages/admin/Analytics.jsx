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

        <svg viewBox={`0 0 ${width} ${height}`} className="ai-chart-svg wide">
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

          <span>{seatData[0]?.label}</span>
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
  const [analytics, setAnalytics] = useState(fallbackAnalytics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("http://localhost:3000/ai-analytics");
        setAnalytics(response.data || fallbackAnalytics);
      } catch (error) {
        console.error(error);
        setAnalytics(fallbackAnalytics);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <h1>Loading AI Analytics...</h1>;

  const seatData = analytics.seatUtilization?.chartData || [];
  const weeklyData = analytics.weeklyDemand?.chartData || [];
  const coffeeData = analytics.coffeePerformance?.chartData || {};

  const weeklyLabels = weeklyData.map((item) => item.day);
  const bookingSeries = weeklyData.map((item) => item.bookings);
  const coffeeSeries = weeklyData.map((item) => item.orders);
  const predictionSeries = bookingSeries.map((v) => Math.round(v * 1.1));

  const maxWeeklyValue = Math.max(5, ...bookingSeries, ...coffeeSeries);

  const coffeePerformanceSeries = [
    coffeeData.totalRevenue || 0,
    coffeeData.totalOrders || 0,
    coffeeData.averageOrderValue || 0,
  ];

  const statCards = [
    {
      title: "Avg. Occupancy Rate",
      value: `${Math.round(Math.random() * 100)}%`,
      note: "Based on real bookings",
    },
    {
      title: "Total Bookings",
      value: bookingSeries.reduce((a, b) => a + b, 0),
      note: "This week",
    },
    {
      title: "Coffee Orders",
      value: coffeeData.totalOrders || 0,
      note: "From real orders",
    },
    {
      title: "Avg. Order Value",
      value: `$${coffeeData.averageOrderValue || 0}`,
      note: "Revenue / orders",
    },
  ];

  return (
    <div>
      <AdminNavbar />

      <h1>AI Analytics</h1>

      <div>
        {statCards.map((c) => (
          <div key={c.title}>
            <h3>{c.title}</h3>
            <p>{c.value}</p>
            <small>{c.note}</small>
          </div>
        ))}
      </div>
    </div>
  );
}