import AdminNavbar from "../../components/AdminNavbar";
import { useEffect, useMemo, useState } from "react";
import {
  Brain,
  BriefcaseBusiness,
  Coffee,
  Lightbulb,
  TrendingUp,
  Users,
} from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const defaultStatCards = [
  {
    title: "Avg. Occupancy Rate",
    value: "78%",
    note: "+5% from last week",
    noteClass: "text-primary",
  },
  {
    title: "Peak Time Accuracy",
    value: "94%",
    note: "AI prediction accuracy",
    noteClass: "text-violet",
  },
  {
    title: "Coffee Orders/Day",
    value: "52",
    note: "+8 from last week",
    noteClass: "text-warning-custom",
  },
  {
    title: "Optimal Capacity",
    value: "85%",
    note: "Recommended target",
    noteClass: "text-success-custom",
  },
];

const defaultInsightCards = [
  {
    title: "Peak Hours Forecast",
    body: "Tomorrow's busiest hours predicted: 12 PM - 2 PM and 5 PM - 7 PM. Consider adding extra staff.",
    badge: "High Priority",
    tone: "pink",
    icon: TrendingUp,
  },
  {
    title: "Resource Allocation",
    body: "Evening shift (5-9 PM) shows 92% utilization. Recommend opening 5 additional seats during peak hours.",
    badge: "Medium Priority",
    tone: "yellow",
    icon: Users,
  },
  {
    title: "Exam Period Alert",
    body: "Predicted 95% occupancy on March 13 (exam week). Consider extending operating hours by 2 hours.",
    badge: "High Priority",
    tone: "pink",
    icon: Brain,
  },
  {
    title: "Coffee Sales Opportunity",
    body: "Coffee orders spike 40% during 12-2 PM. Recommend promotional bundle: Study + Coffee combo.",
    badge: "Medium Priority",
    tone: "yellow",
    icon: Lightbulb,
  },
];

const weeklyLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const bookingSeries = [120, 146, 130, 156, 110, 90, 75];
const coffeeSeries = [84, 101, 94, 110, 78, 64, 52];
const predictionSeries = [124, 151, 135, 162, 115, 94, 80];

const coffeeLabels = ["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7"];
const revenueSeries = [285, 310, 294, 342, 327, 355, 372];
const ordersSeries = [42, 46, 45, 52, 50, 55, 58];

const seatData = [
  { label: "Morning (8-12)", value: 65, color: "#3f7bf1" },
  { label: "Afternoon (12-5)", value: 85, color: "#8a63f5" },
  { label: "Evening (5-9)", value: 92, color: "#1abc87" },
];

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
      x: left + (innerWidth / (values.length - 1)) * index,
      y: top + innerHeight - (value / max) * innerHeight,
      value,
    }));

  const normalizedSeries = series.map((item) => ({
    ...item,
    points: pointsForSeries(item.data, item.axis === "right" ? rightMax : leftMax),
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

        <svg viewBox={`0 0 ${width} ${height}`} className="ai-chart-svg wide" aria-hidden="true">
          {leftTicks.map((tick) => {
            const y = top + innerHeight - (tick / leftMax) * innerHeight;
            return (
              <g key={`left-${tick}`}>
                <line x1={left} y1={y} x2={width - right} y2={y} className="grid-line" />
                <text x={left - 10} y={y + 5} textAnchor="end" className="axis-text">
                  {tick}
                </text>
              </g>
            );
          })}

          {labels.map((label, index) => {
            const x = left + (innerWidth / (labels.length - 1)) * index;
            return (
              <g key={label}>
                <line x1={x} y1={top} x2={x} y2={top + innerHeight} className="grid-line vertical" />
                <text x={x} y={height - 12} textAnchor="middle" className="axis-text">
                  {label}
                </text>
              </g>
            );
          })}

          <line x1={left} y1={top} x2={left} y2={top + innerHeight} className="focus-line" />
          <line x1={left} y1={top + innerHeight} x2={width - right} y2={top + innerHeight} className="focus-line" />

          {rightTicks
            ? rightTicks.map((tick) => {
                const y = top + innerHeight - (tick / rightMax) * innerHeight;
                return (
                  <text key={`right-${tick}`} x={width - right + 8} y={y + 5} className="axis-text">
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
                <circle key={`${item.name}-${index}`} cx={point.x} cy={point.y} r="6.5" className={item.pointClass} />
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

function PieChartCard({ data = seatData }) {
  return (
    <article className="card ai-chart-card h-100">
      <div className="card-body ai-chart-card-body">
        <div className="ai-chart-title-row">
          <span className="ai-title-icon green">
            <Users size={24} />
          </span>
          <h3 className="ai-chart-title mb-0">Seat Utilization by Time Period</h3>
        </div>

        <div className="ai-pie-wrap">
          <div className="ai-pie-chart" />
          {data.map((item, index) => (
            <span
              className={`ai-pie-label ${["ai-label-blue", "ai-label-purple", "ai-label-green"][index] || "ai-label-blue"}`}
              key={item.label}
            >
              {item.label}: {item.value}%
            </span>
          ))}
        </div>

        <div className="ai-seat-legend-grid">
          {data.map((item) => (
            <div className="ai-seat-legend-card" key={item.label}>
              <span className="ai-seat-legend-dot" style={{ backgroundColor: item.color }} />
              <span className="ai-seat-legend-name">{item.label}</span>
              <strong className="ai-seat-legend-value">{item.value}%</strong>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadAnalytics() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/api/ai-analytics`);
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || payload.message || "Failed to load analytics");
        }

        if (!cancelled) {
          setAnalytics(payload);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAnalytics();

    return () => {
      cancelled = true;
    };
  }, []);

  const liveData = useMemo(() => {
    const seatChartData = analytics?.seatUtilization?.chartData?.length
      ? analytics.seatUtilization.chartData.map((item, index) => ({
          ...item,
          color: seatData[index]?.color || "#3f7bf1",
        }))
      : seatData;

    const weeklyData = analytics?.weeklyDemand?.chartData?.length
      ? analytics.weeklyDemand.chartData
      : weeklyLabels.map((day, index) => ({
          day,
          bookings: bookingSeries[index],
          orders: coffeeSeries[index],
          revenue: revenueSeries[index] || 0,
        }));

    const labels = weeklyData.map((item) => item.day);
    const bookings = weeklyData.map((item) => Number(item.bookings || 0));
    const orders = weeklyData.map((item) => Number(item.orders || 0));
    const revenue = weeklyData.map((item) => Number(item.revenue || 0));
    const prediction = bookings.map((value) => Math.round(value * 1.05));
    const maxBookings = Math.max(160, ...bookings, ...prediction, 1);
    const maxRevenue = Math.max(380, ...revenue, 1);
    const maxOrders = Math.max(60, ...orders, 1);
    const stats = analytics?.stats;
    const averageOccupancy = seatChartData.length
      ? Math.round(seatChartData.reduce((sum, item) => sum + item.value, 0) / seatChartData.length)
      : 0;

    return {
      seatChartData,
      labels,
      bookings,
      orders,
      revenue,
      prediction,
      maxBookings,
      maxRevenue,
      maxOrders,
      statCards: stats
        ? [
            {
              title: "Avg. Occupancy Rate",
              value: `${averageOccupancy}%`,
              note: `${stats.totalBookings} total bookings`,
              noteClass: "text-primary",
            },
            {
              title: "Peak Period",
              value: stats.peakPeriod?.split(" ")[0] || "N/A",
              note: stats.peakPeriod || "No bookings yet",
              noteClass: "text-violet",
            },
            {
              title: "Coffee Orders",
              value: stats.totalOrders,
              note: `$${Number(stats.averageOrderValue || 0).toFixed(2)} average order`,
              noteClass: "text-warning-custom",
            },
            {
              title: "Total Revenue",
              value: `$${Number(stats.totalRevenue || 0).toFixed(0)}`,
              note: "From payment records",
              noteClass: "text-success-custom",
            },
          ]
        : defaultStatCards,
      insightCards: analytics
        ? [
            {
              title: "Seat Utilization",
              body: analytics.seatUtilization?.analysis?.insight || "No seat insight available.",
              badge: "AI Insight",
              tone: "pink",
              icon: TrendingUp,
            },
            {
              title: "Weekly Demand",
              body: analytics.weeklyDemand?.analysis?.recommendation || "No weekly recommendation available.",
              badge: "Recommendation",
              tone: "yellow",
              icon: Users,
            },
            {
              title: "Coffee Performance",
              body: analytics.coffeePerformance?.analysis?.insight || "No coffee insight available.",
              badge: "AI Insight",
              tone: "pink",
              icon: Coffee,
            },
          ]
        : defaultInsightCards,
    };
  }, [analytics]);

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
            <p className="ai-hero-subtitle mb-0">Advanced insights and predictive analysis</p>
          </div>
        </section>

        {error ? <div className="alert alert-danger mb-4">{error}</div> : null}
        {loading ? <div className="alert alert-info mb-4">Loading live analytics...</div> : null}

        <section className="row g-4 mb-5 ai-stat-row">
          {liveData.statCards.map((card) => (
            <div className="col-12 col-md-6 col-xl-3" key={card.title}>
              <article className="card ai-stat-card h-100">
                <div className="card-body ai-stat-card-body">
                  <h3 className="ai-stat-title">{card.title}</h3>
                  <div className="ai-stat-value">{card.value}</div>
                  <div className={`ai-stat-note ${card.noteClass}`}>{card.note}</div>
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
            {liveData.insightCards.map((item) => {
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
                    <span className={`priority-badge ${item.tone}`}>{item.badge}</span>
                  </article>
                </div>
              );
            })}
          </div>
        </section>

        <section className="row g-4 mb-4">
          <div className="col-12">
            <PieChartCard data={liveData.seatChartData} />
          </div>

          <div className="col-12 col-xl-6">
            <LineChart
              labels={liveData.labels}
              leftTicks={[0, 40, 80, 120, 160]}
              leftMax={liveData.maxBookings}
              series={[
                {
                  title: "Weekly Demand & Forecast",
                  name: "Bookings",
                  data: liveData.bookings,
                  pathClass: "line-blue",
                  pointClass: "point-blue",
                  legendClass: "blue",
                  iconTone: "purple",
                },
                {
                  name: "Coffee Orders",
                  data: liveData.orders,
                  pathClass: "line-orange",
                  pointClass: "point-orange",
                  legendClass: "orange",
                },
                {
                  name: "AI Prediction",
                  data: liveData.prediction,
                  pathClass: "line-purple",
                  pointClass: "point-purple",
                  legendClass: "purple",
                  dashed: true,
                },
              ]}
              footer={analytics?.weeklyDemand?.analysis?.insight || "Weekly demand is based on live bookings and payments."}
            />
          </div>

          <div className="col-12 col-xl-6">
            <LineChart
              labels={liveData.labels}
              leftTicks={[0, 95, 190, 285, 380]}
              rightTicks={[0, 15, 30, 45, 60]}
              leftMax={liveData.maxRevenue}
              rightMax={liveData.maxOrders}
              series={[
                {
                  title: "Coffee Shop Performance",
                  name: "Revenue ($)",
                  data: liveData.revenue,
                  pathClass: "line-green",
                  pointClass: "point-green",
                  legendClass: "green",
                  iconTone: "orange",
                },
                {
                  name: "Orders",
                  data: liveData.orders,
                  axis: "right",
                  pathClass: "line-orange",
                  pointClass: "point-orange",
                  legendClass: "orange",
                },
              ]}
              footer={analytics?.coffeePerformance?.analysis?.recommendation || "Coffee performance is calculated from live payment records."}
              footerAccent="green-accent"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
