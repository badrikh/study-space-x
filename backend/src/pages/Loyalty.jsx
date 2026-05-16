import { useState } from "react";
import UserNavbar from "../components/UserNavbar";
import trophyImage from "../assets/loyalty/trophy.png";

const rewards = [
  { id: 1, title: "Free Study Hour", description: "Redeem for 1 hour of free study time", points: 100, iconBg: "#dbeafe", iconColor: "#2563eb", type: "clock" },
  { id: 2, title: "Free Coffee", description: "Get any drink from our coffee shop", points: 150, iconBg: "#fef3c7", iconColor: "#d97706", type: "coffee" },
  { id: 3, title: "3 Free Hours", description: "3 hours of premium study time", points: 250, iconBg: "#f3e8ff", iconColor: "#9333ea", type: "clock" },
  { id: 4, title: "VIP Day Pass", description: "Full day access with VIP privileges", points: 500, iconBg: "#dcfce7", iconColor: "#16a34a", type: "star" },
];

const earnItems = [
  { title: "Study Sessions", subtitle: "10 points per hour", type: "clock", color: "#2563eb" },
  { title: "Referrals", subtitle: "50 points per friend", type: "referral", color: "#16a34a" },
  { title: "Purchases", subtitle: "10 points per $5 spent", type: "coffee", color: "#ea580c" },
];

function Icon({ type, color }) {
  const props = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "coffee") {
    return (
      <svg {...props}>
        <path d="M7 8h8v6a4 4 0 0 1-4 4 4 4 0 0 1-4-4V8Z" />
        <path d="M15 9h2a2 2 0 1 1 0 4h-2" />
        <path d="M9 4v2" />
        <path d="M12 4v2" />
      </svg>
    );
  }

  if (type === "star") {
    return (
      <svg {...props}>
        <path d="m12 3 2.7 5.48 6.05.88-4.38 4.27 1.03 6.03L12 16.83l-5.4 2.83 1.03-6.03L3.25 9.36l6.05-.88L12 3Z" />
      </svg>
    );
  }

  if (type === "referral") {
    return (
      <svg {...props}>
        <path d="M15 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6" />
        <path d="M22 11h-6" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function RewardCard({ reward, currentPoints, onRedeem }) {
  const canRedeem = currentPoints >= reward.points;

  return (
    <article className="card border-0 shadow-sm h-100 loyalty-card-light">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start loyalty-card-top">
          <span
            className="loyalty-reward-icon d-inline-flex align-items-center justify-content-center"
            style={{ width: 60, height: 60, backgroundColor: reward.iconBg }}
          >
            <Icon type={reward.type} color={reward.iconColor} />
          </span>
          <div className="text-end">
            <div className="fs-1 lh-1">{reward.points}</div>
            <div className="text-secondary fs-4">points</div>
          </div>
        </div>
        <h3 className="fw-semibold loyalty-card-title">{reward.title}</h3>
        <p className="text-secondary loyalty-card-desc">{reward.description}</p>
        <button
          type="button"
          className={`btn mt-auto fw-semibold loyalty-redeem-btn ${canRedeem ? "btn-primary" : "btn-outline-secondary text-secondary"}`}
          disabled={!canRedeem}
          onClick={() => onRedeem(reward.points)}
        >
          {canRedeem ? "Redeem Now" : `Need ${reward.points - currentPoints} more points`}
        </button>
      </div>
    </article>
  );
}

function ReferralCard() {
  return (
    <article className="loyalty-info-card">
      <h2 className="loyalty-info-title">
        <Icon type="referral" color="#2563eb" />
        Referral Program
      </h2>
      <div className="referral-count-box">
        <strong>3</strong>
        <span>friends referred</span>
      </div>
      <div className="referral-points-row">
        <span>Points per referral</span>
        <strong>+50 points</strong>
      </div>
      <button type="button" className="btn btn-primary loyalty-share-btn">Share Referral Link</button>
    </article>
  );
}

function EarnPointsCard() {
  return (
    <article className="loyalty-info-card">
      <h2 className="loyalty-info-title">How to Earn Points</h2>
      <div className="earn-list">
        {earnItems.map((item) => (
          <div className="earn-item" key={item.title}>
            <Icon type={item.type} color={item.color} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function Loyalty() {
  const [currentPoints, setCurrentPoints] = useState(350);
  const nextRewardTarget = 500;
  const pointsToGo = Math.max(nextRewardTarget - currentPoints, 0);
  const progressValue = Math.min((currentPoints / nextRewardTarget) * 100, 100);

  return (
    <main className="min-vh-100 position-relative pt-5 pb-5 loyalty-page">
      <UserNavbar absolute />
      <section className="container loyalty-wrap">
        <header className="text-center mb-5 pb-2">
          <h1 className="fw-bold mb-3 loyalty-heading">Loyalty & Rewards</h1>
          <p className="text-secondary mb-0 loyalty-subheading">Earn points and get rewarded for studying</p>
        </header>

        <div className="loyalty-dashboard">
          <aside className="loyalty-left-column">
            <div className="text-white shadow loyalty-hero-card">
              <div className="d-flex justify-content-between align-items-start loyalty-points-top">
                <div>
                  <p className="mb-2 loyalty-points-label">Your Points</p>
                  <h2 className="display-1 fw-medium mb-0">{currentPoints}</h2>
                </div>
                <img src={trophyImage} alt="Trophy" className="loyalty-trophy" />
              </div>
              <div className="loyalty-next-reward">
                <div className="d-flex justify-content-between mb-2">
                  <span>Next Reward</span>
                  <span>{pointsToGo} points to go</span>
                </div>
                <div className="progress loyalty-progress">
                  <div className="progress-bar" style={{ width: `${progressValue}%` }} />
                </div>
                <p>Keep studying to earn more points and unlock amazing rewards!</p>
              </div>
            </div>
          </aside>

          <section className="loyalty-right-column">
            <h2 className="available-rewards-title">Available Rewards</h2>
            <div className="row g-4">
              {rewards.map((reward) => (
                <div className="col-12 col-md-6" key={reward.id}>
                  <RewardCard
                    reward={reward}
                    currentPoints={currentPoints}
                    onRedeem={(cost) => setCurrentPoints((prev) => Math.max(prev - cost, 0))}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="loyalty-extra-grid">
            <ReferralCard />
            <EarnPointsCard />
          </section>
        </div>
      </section>
    </main>
  );
}
