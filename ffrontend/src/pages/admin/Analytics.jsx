import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { Brain, Coffee, DollarSign, Lightbulb, TrendingUp, Users } from "lucide-react";

const API_ROOT = "http://localhost:3000";
const ADMIN_API = `${API_ROOT}/api/admin`;
const COLORS = ["#3f7bf1", "#8a63f5", "#1abc87"];
const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const emptyAnalytics = {
  seatUtilization: {
    chartData: [
      { label: "Morning (8-12)", value: 0 },
      { label: "Afternoon (12-5)", value: 0 },
      { label: "Evening (5-9)", value: 0 },
    ],
    analysis: {
      insight: "No booking data is available yet.",
      recommendation: "Start collecting bookings to identify your busiest study periods.",
    },
  },
  weeklyDemand: {
    chartData: WEEK_DAYS.map((day) => ({ day, bookings: 0, orders: 0 })),
    analysis: {
      insight: "No weekly demand data is available yet.",
      recommendation: "Bookings and orders will appear here once students start using the system.",
    },
  },
  coffeePerformance: {
    chartData: {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
    },
    analysis: {
      insight: "No coffee orders are available yet.",
      recommendation: "Coffee performance will update after the first completed orders.",
    },
  },
};

const money = (value) =>
  `$${Number(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

const asArray = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const toPercent = (value, total) => (total > 0 ? Math.round((Number(value || 0) / total) * 100) : 0);

const getHour = (value) => {
  if (!value) return null;

  const text = String(value);
  const timeMatch = text.match(/(\d{1,2})(?::\d{2})?\s*(AM|PM)?/i);

  if (timeMatch) {
    let hour = Number(timeMatch[1]);
    const period = timeMatch[2]?.toUpperCase();
    if (period === "PM" && hour < 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    return hour;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.getHours();
};

const getDayName = (value) => {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { weekday: "short" });
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

function LineChart({ title, iconTone, labels, series, footer, footerAccent = "" }) {
  const width = 640;
  const height = 320;
  const left = 58;
  const right = 22;
  const top = 24;
  const bottom = 58;
  const innerWidth = width - left - right;
  const innerHeight = height - top - bottom;
  const maxValue = Math.max(5, ...series.flatMap((item) => item.data.map((value) => Number(value || 0))));
  const ticks = [0, Math.round(maxValue / 2), maxValue];

  const pointsForSeries = (values) =>
    values.map((value, index) => ({
      x: left + (innerWidth / (values.length - 1 || 1)) * index,
      y: top + innerHeight - (Number(value || 0) / maxValue) * innerHeight,
      value,
    }));

  const normalizedSeries = series.map((item) => ({
    ...item,
    points: pointsForSeries(item.data),
  }));

  return (
    <article className="card ai-chart-card h-100">
      <div className="card-body ai-chart-card-body">
        <div className="ai-chart-title-row">
          <span className={`ai-title-icon ${iconTone}`}>
            <TrendingUp size={24} />
          </span>
          <h3 className="ai-chart-title mb-0">{title}</h3>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="ai-chart-svg wide" role="img" aria-label={title}>
          {ticks.map((tick) => {
            const y = top + innerHeight - (tick / maxValue) * innerHeight;
            return (
              <g key={tick}>
                <line x1={left} x2={width - right} y1={y} y2={y} stroke="#e8edf5" strokeDasharray="4 5" />
                <text x={left - 14} y={y + 4} textAnchor="end" fontSize="12" fill="#73809a">
                  {tick}
                </text>
              </g>
            );
          })}
          {labels.map((label, index) => {
            const x = left + (innerWidth / (labels.length - 1 || 1)) * index;
            return (
              <g key={label}>
                <line x1={x} x2={x} y1={top} y2={top + innerHeight} stroke="#eef2f8" strokeDasharray="4 5" />
                <text x={x} y={height - 18} textAnchor="middle" fontSize="13" fill="#6b7890">
                  {label}
                </text>
              </g>
            );
          })}
          <line x1={left} x2={left} y1={top} y2={top + innerHeight} stroke="#d5dce8" />
          <line x1={left} x2={width - right} y1={top + innerHeight} y2={top + innerHeight} stroke="#d5dce8" />

          {normalizedSeries.map((item) => (
            <g key={item.name}>
              <path d={buildSmoothPath(item.points)} className={`${item.pathClass} ${item.dashed ? "dashed" : ""}`} />
              {item.points.map((point, index) => (
                <circle key={`${item.name}-${index}`} cx={point.x} cy={point.y} r="6" className={item.pointClass} />
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

function SeatUtilizationCard({ seatData, analysis }) {
  const total = seatData.reduce((sum, item) => sum + Number(item.value || 0), 0);
  let start = 0;
  const gradientStops = seatData.map((item, index) => {
    const degrees = total > 0 ? (Number(item.value || 0) / total) * 360 : 120;
    const stop = `${COLORS[index % COLORS.length]} ${start}deg ${start + degrees}deg`;
    start += degrees;
    return stop;
  });
  const pieBackground = `conic-gradient(${gradientStops.join(", ")})`;

  return (
    <article className="card ai-chart-card">
      <div className="card-body ai-chart-card-body">
        <div className="ai-chart-title-row">
          <span className="ai-title-icon green">
            <Users size={24} />
          </span>
          <h3 className="ai-chart-title mb-0">Seat Utilization by Time Period</h3>
        </div>

        <div className="ai-pie-wrap">
          <div className="ai-pie-chart" style={{ background: pieBackground }} />
          {seatData.map((item, index) => (
            <span
              key={item.label}
              className={`ai-pie-label ${index === 0 ? "ai-label-blue" : index === 1 ? "ai-label-purple" : "ai-label-green"}`}
            >
              {item.label}: {toPercent(item.value, total)}%
            </span>
          ))}
        </div>

        <div className="ai-seat-legend-grid">
          {seatData.map((item, index) => (
            <div key={item.label} className="ai-seat-legend-card">
              <span className="ai-seat-legend-dot" style={{ background: COLORS[index % COLORS.length] }} />
              <span className="ai-seat-legend-name">{item.label}</span>
              <strong className="ai-seat-legend-value">{toPercent(item.value, total)}%</strong>
            </div>
          ))}
        </div>

        <p className="ai-chart-footer mt-4">{analysis?.insight}</p>
        <p className="ai-chart-footer green-accent">{analysis?.recommendation}</p>
      </div>
    </article>
  );
}

const normalizeAnalytics = (payload) => ({
  seatUtilization: {
    ...emptyAnalytics.seatUtilization,
    ...payload?.seatUtilization,
    analysis: {
      ...emptyAnalytics.seatUtilization.analysis,
      ...payload?.seatUtilization?.analysis,
    },
  },
  weeklyDemand: {
    ...emptyAnalytics.weeklyDemand,
    ...payload?.weeklyDemand,
    analysis: {
      ...emptyAnalytics.weeklyDemand.analysis,
      ...payload?.weeklyDemand?.analysis,
    },
  },
  coffeePerformance: {
    ...emptyAnalytics.coffeePerformance,
    ...payload?.coffeePerformance,
    chartData: {
      ...emptyAnalytics.coffeePerformance.chartData,
      ...payload?.coffeePerformance?.chartData,
    },
    analysis: {
      ...emptyAnalytics.coffeePerformance.analysis,
      ...payload?.coffeePerformance?.analysis,
    },
  },
});

const buildAnalyticsFromAdminData = (reservations, orders) => {
  const weeklyMap = new Map(WEEK_DAYS.map((day) => [day, { day, bookings: 0, orders: 0 }]));

  reservations.forEach((reservation) => {
    const day = getDayName(reservation.date || reservation.booking_date || reservation.createdAt);
    if (day && weeklyMap.has(day)) weeklyMap.get(day).bookings += 1;
  });

  orders.forEach((order) => {
    const day = getDayName(order.order_date || order.createdAt || order.date);
    if (day && weeklyMap.has(day)) weeklyMap.get(day).orders += 1;
  });

  const seatBuckets = [
    { label: "Morning (8-12)", value: 0 },
    { label: "Afternoon (12-5)", value: 0 },
    { label: "Evening (5-9)", value: 0 },
  ];

  reservations.forEach((reservation) => {
    const hour = getHour(reservation.time || reservation.start_time || reservation.date);
    if (hour === null) return;
    if (hour < 12) seatBuckets[0].value += 1;
    else if (hour < 17) seatBuckets[1].value += 1;
    else seatBuckets[2].value += 1;
  });

  const weeklyData = [...weeklyMap.values()];
  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total_cost || order.total || order.price || 0),
    0
  );
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders ? totalRevenue / totalOrders : 0;
  const busiestSeatPeriod = [...seatBuckets].sort((a, b) => b.value - a.value)[0];
  const busiestDay = [...weeklyData].sort((a, b) => b.bookings - a.bookings)[0];

  return normalizeAnalytics({
    seatUtilization: {
      chartData: seatBuckets,
      analysis: {
        insight: busiestSeatPeriod?.value
          ? `Seat utilization is highest during ${busiestSeatPeriod.label.toLowerCase()}.`
          : "No booking data is available yet.",
        recommendation: busiestSeatPeriod?.value
          ? `Consider adjusting staffing levels to accommodate the increased demand during ${busiestSeatPeriod.label.toLowerCase()}.`
          : "Start collecting bookings to identify your busiest study periods.",
      },
    },
    weeklyDemand: {
      chartData: weeklyData,
      analysis: {
        insight: busiestDay?.bookings
          ? `${busiestDay.day} has the highest booking demand this week.`
          : "No weekly demand data is available yet.",
        recommendation: busiestDay?.bookings
          ? `Prioritize staffing and inventory management on ${busiestDay.day} to meet the increased demand.`
          : "Bookings and orders will appear here once students start using the system.",
      },
    },
    coffeePerformance: {
      chartData: {
        totalRevenue: Number(totalRevenue.toFixed(2)),
        totalOrders,
        averageOrderValue: Number(averageOrderValue.toFixed(2)),
      },
      analysis: {
        insight: totalOrders
          ? `${totalOrders} coffee orders have generated ${money(totalRevenue)} in revenue.`
          : "No coffee orders are available yet.",
        recommendation: totalOrders
          ? "Consider offering premium or specialty coffee options to further increase average order value."
          : "Coffee performance will update after the first completed orders.",
      },
    },
  });
};

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(emptyAnalytics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/ai-analytics`);
        setAnalytics(normalizeAnalytics(response.data));
      } catch (primaryError) {
        try {
          const [reservationsResponse, ordersResponse] = await Promise.all([
            axios.get(`${ADMIN_API}/reservations`),
            axios.get(`${ADMIN_API}/orders`),
          ]);

          setAnalytics(buildAnalyticsFromAdminData(asArray(reservationsResponse.data), asArray(ordersResponse.data)));
          setError("AI endpoint is unavailable, so this view is using admin reservation and order data.");
        } catch (fallbackError) {
          console.error(primaryError, fallbackError);
          setAnalytics(emptyAnalytics);
          setError("Analytics could not be loaded. Make sure the backend is running on port 3000.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const seatData = analytics.seatUtilization?.chartData || emptyAnalytics.seatUtilization.chartData;
  const weeklyData = analytics.weeklyDemand?.chartData || emptyAnalytics.weeklyDemand.chartData;
  const coffeeData = analytics.coffeePerformance?.chartData || emptyAnalytics.coffeePerformance.chartData;

  const bookingSeries = weeklyData.map((item) => Number(item.bookings || 0));
  const coffeeSeries = weeklyData.map((item) => Number(item.orders || 0));
  const predictionSeries = bookingSeries.map((value) => Math.max(0, Math.round(value * 1.1)));
  const totalBookings = bookingSeries.reduce((sum, value) => sum + value, 0);
  const occupancyRate = Math.min(100, Math.round((totalBookings / 70) * 100));

  const coffeePerformanceSeries = [
    Number(coffeeData.totalRevenue || 0),
    Number(coffeeData.totalOrders || 0),
    Number(coffeeData.averageOrderValue || 0),
  ];

  const statCards = useMemo(
    () => [
      {
        title: "Avg. Occupancy Rate",
        value: `${occupancyRate}%`,
        note: "Based on real bookings",
        noteClass: "text-primary",
      },
      {
        title: "Total Bookings",
        value: totalBookings,
        note: "This week",
        noteClass: "text-primary",
      },
      {
        title: "Coffee Orders",
        value: coffeeData.totalOrders || 0,
        note: "From real orders",
        noteClass: "text-warning",
      },
      {
        title: "Avg. Order Value",
        value: money(coffeeData.averageOrderValue),
        note: "Revenue / orders",
        noteClass: "text-success",
      },
    ],
    [coffeeData.averageOrderValue, coffeeData.totalOrders, occupancyRate, totalBookings]
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="ai-analytics-page min-vh-100">
      <AdminNavbar />
      <main className="container-fluid ai-analytics-shell px-4 px-xl-5 py-4 py-lg-5">
        <section className="ai-hero-section">
          <div className="ai-hero-badge">
            <Brain size={28} />
          </div>
          <div>
            <h2 className="ai-hero-title mb-1">AI-Powered Analytics</h2>
            <p className="ai-hero-subtitle mb-0">Advanced insights and predictive analysis</p>
          </div>
        </section>

        {error && <div className="alert alert-warning mb-4">{error}</div>}

        <section className="row g-4 mb-5">
          {statCards.map((card) => (
            <div className="col-12 col-md-6 col-xl-3" key={card.title}>
              <article className="card ai-stat-card h-100">
                <div className="card-body ai-stat-card-body">
                  <h3 className="ai-stat-title">{card.title}</h3>
                  <div className="ai-stat-value">{card.value}</div>
                  <p className={`ai-stat-note mb-0 ${card.noteClass}`}>{card.note}</p>
                </div>
              </article>
            </div>
          ))}
        </section>

        <section className="ai-insights-shell mb-5">
          <div className="ai-section-heading">
            <Brain className="ai-section-icon" size={28} />
            <h2>AI Insights & Recommendations</h2>
          </div>
          <div className="row g-4">
            {[
              {
                title: "Seat Utilization Insight",
                body: analytics.seatUtilization?.analysis?.recommendation,
                icon: Users,
                tone: "yellow",
              },
              {
                title: "Weekly Demand Insight",
                body: analytics.weeklyDemand?.analysis?.recommendation,
                icon: TrendingUp,
                tone: "pink",
              },
              {
                title: "Coffee Sales Opportunity",
                body: analytics.coffeePerformance?.analysis?.recommendation,
                icon: Lightbulb,
                tone: "yellow",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div className="col-12 col-lg-6" key={item.title}>
                  <article className={`ai-insight-card ${item.tone}`}>
                    <div className="ai-insight-header">
                      <Icon className="ai-insight-icon" size={22} />
                      <h3 className="ai-insight-title">{item.title}</h3>
                    </div>
                    <p className="ai-insight-body mb-3">{item.body}</p>
                    <span className={`badge ${item.tone === "pink" ? "text-bg-danger" : "text-bg-warning"}`}>AI Advice</span>
                  </article>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-5">
          <SeatUtilizationCard seatData={seatData} analysis={analytics.seatUtilization?.analysis} />
        </section>

        <section className="row g-4">
          <div className="col-12 col-xl-6">
            <LineChart
              title="Weekly Demand & Forecast"
              iconTone="purple"
              labels={weeklyData.map((item) => item.day)}
              series={[
                { name: "Bookings", data: bookingSeries, pathClass: "line-blue", pointClass: "point-blue", legendClass: "blue" },
                { name: "Coffee Orders", data: coffeeSeries, pathClass: "line-orange", pointClass: "point-orange", legendClass: "orange" },
                { name: "AI Prediction", data: predictionSeries, pathClass: "line-purple", pointClass: "point-purple", legendClass: "purple", dashed: true },
              ]}
              footer={analytics.weeklyDemand?.analysis?.recommendation}
            />
          </div>

          <div className="col-12 col-xl-6">
            <LineChart
              title="Coffee Shop Performance"
              iconTone="orange"
              labels={["Revenue", "Orders", "Avg Ord"]}
              series={[
                {
                  name: "Performance",
                  data: coffeePerformanceSeries,
                  pathClass: "line-green",
                  pointClass: "point-green",
                  legendClass: "green",
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
