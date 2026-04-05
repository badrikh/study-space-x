import { useState } from 'react';
import trophyImage from '../dist/assets/trophy.png';

const rewards = [
  {
    id: 1,
    title: 'Free Study Hour',
    description: 'Redeem for 1 hour of free study time',
    points: 100,
    iconBg: '#dbeafe',
    iconColor: '#2563eb',
    type: 'clock',
    actionLabel: 'Redeem Now',
    disabled: false,
  },
  {
    id: 2,
    title: 'Free Coffee',
    description: 'Get any drink from our coffee shop',
    points: 150,
    iconBg: '#fef3c7',
    iconColor: '#d97706',
    type: 'coffee',
    actionLabel: 'Redeem Now',
    disabled: false,
  },
  {
    id: 3,
    title: '3 Free Hours',
    description: '3 hours of premium study time',
    points: 250,
    iconBg: '#f3e8ff',
    iconColor: '#9333ea',
    type: 'clock',
    actionLabel: 'Redeem Now',
    disabled: false,
  },
  {
    id: 4,
    title: 'VIP Day Pass',
    description: 'Full day access with VIP privileges',
    points: 500,
    iconBg: '#dcfce7',
    iconColor: '#16a34a',
    type: 'star',
    actionLabel: 'Need 150 more points',
    disabled: true,
  },
];

function Icon({ type, color }) {
  const commonProps = {
    width: 28,
    height: 28,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (type === 'coffee') {
    return (
      <svg {...commonProps}>
        <path d="M7 8h8v6a4 4 0 0 1-4 4 4 4 0 0 1-4-4V8Z" />
        <path d="M15 9h2a2 2 0 1 1 0 4h-2" />
        <path d="M9 4v2" />
        <path d="M12 4v2" />
      </svg>
    );
  }

  if (type === 'star') {
    return (
      <svg {...commonProps}>
        <path d="m12 3 2.7 5.48 6.05.88-4.38 4.27 1.03 6.03L12 16.83l-5.4 2.83 1.03-6.03L3.25 9.36l6.05-.88L12 3Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function RewardCard({ reward, currentPoints, onRedeem }) {
  const canRedeem = currentPoints >= reward.points;
  const buttonLabel = canRedeem ? 'Redeem Now' : `Need ${reward.points - currentPoints} more points`;

  return (
    <article className="card border-0 shadow-sm rounded-4 h-100"
     style={{ backgroundColor: '#fcfcfb' }}>
      <div className="card-body p-4 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-4">
          <span
            className="rounded-4 d-inline-flex align-items-center justify-content-center"
            style={{ width: 60, height: 60, backgroundColor: reward.iconBg }}
          >
            <Icon type={reward.type} color={reward.iconColor} />
          </span>
          <div className="text-end">
            <div className="fs-1 lh-1">{reward.points}</div>
            <div className="text-secondary fs-4">points</div>
          </div>
        </div>

        <h3 className="fw-semibold mb-3" style={{ fontSize: '2rem' }}>
          {reward.title}
        </h3>
        <p className="text-secondary mb-4" style={{ fontSize: '1.15rem' }}>
          {reward.description}
        </p>

        <button
          type="button"
          className={`btn mt-auto rounded-4 fw-semibold py-3 ${
            canRedeem ? 'btn-primary' : 'btn-secondary-subtle text-secondary'
          }`}
          disabled={!canRedeem}
          onClick={() => onRedeem(reward.points)}
          style={{ fontSize: '1.1rem' }}
        >
          {buttonLabel}
        </button>
      </div>
    </article>
  );
}

function LoyaltyRewards() {
  const [currentPoints, setCurrentPoints] = useState(350);
  const nextRewardTarget = 500;
  const pointsToGo = Math.max(nextRewardTarget - currentPoints, 0);
  const progressValue = Math.min((currentPoints / nextRewardTarget) * 100, 100);

  function handleRedeem(pointsCost) {
    setCurrentPoints((prevPoints) => Math.max(prevPoints - pointsCost, 0));
  }

  return (
    <main className=" min-vh-100 py-5"
    style={{ backgroundColor: '#fbf9f0' }}>
      <section className="container" style={{ maxWidth: '1400px' }}>
        <header className="text-center mb-5 pb-2">
          <h1 className="fw-bold mb-3" style={{ fontSize: '3.5rem', color: '#0f172a' }}>
            Loyalty &amp; Rewards
          </h1>
          <p className="text-secondary mb-0" style={{ fontSize: '1.35rem' }}>
            Earn points and get rewarded for studying
          </p>
        </header>

        <div className="row g-4 align-items-stretch">
          <div className="col-12 col-lg-4">
            <div
              className="text-white rounded-4 shadow p-4 h-100"
              style={{
                background: 'linear-gradient(135deg, #a21caf 0%, #4f46e5 50%, #2563eb 100%)',
                minHeight: '325px',
              }}
            >
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <p className="mb-2 fs-3">Your Points</p>
                  <h2 className="display-1 fw-medium mb-0">{currentPoints}</h2>
                </div>
                <img
                  src={trophyImage}
                  alt="Trophy"
                  style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fs-4">Next Reward</span>
                <span className="fs-4">{pointsToGo} points to go</span>
              </div>

              <div
                className="progress mb-4"
                role="progressbar"
                aria-label="Reward progress"
                aria-valuenow={progressValue}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ height: '14px', backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <div
                  className="progress-bar rounded-pill"
                  style={{
                    width: `${progressValue}%`,
                    background: 'linear-gradient(90deg, #ffffff 0%, #f5d0fe 100%)',
                  }}
                />
              </div>

              <p className="mb-0 fs-4" style={{ maxWidth: '420px', lineHeight: 1.4 }}>
                Keep studying to earn more points and unlock amazing rewards!
              </p>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <section className="h-100">
              <h2 className="fw-bold mb-4" style={{ fontSize: '2.7rem', color: '#0f172a' }}>
                Available Rewards
              </h2>
              <div className="row g-4">
                {rewards.map((reward) => (
                  <div key={reward.id} className="col-12 col-md-6">
                    <RewardCard
                      reward={reward}
                      currentPoints={currentPoints}
                      onRedeem={handleRedeem}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="row g-4 mt-1">
          <div className="col-12 col-md-6">
            <article className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <h2 className="fw-bold d-flex align-items-center gap-3 mb-4" style={{ fontSize: '2rem' }}>
                  <span
                    className="rounded-circle d-inline-flex align-items-center justify-content-center"
                    style={{ width: 34, height: 34, color: '#2563eb' }}
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                      <circle cx="9.5" cy="7" r="3" />
                      <path d="M20 8v6" />
                      <path d="M23 11h-6" />
                    </svg>
                  </span>
                  Referral Program
                </h2>

                <div className="rounded-4 p-4 mb-4" style={{ backgroundColor: '#eaf2ff' }}>
                  <div className="display-4 text-primary mb-2">3</div>
                  <div className="text-secondary" style={{ fontSize: '1.2rem' }}>
                    Friends referred
                  </div>
                </div>

                <div className="d-flex justify-content-between mb-3" style={{ fontSize: '1.2rem' }}>
                  <span className="text-secondary">Points per referral</span>
                  <span className="text-success">+50 points</span>
                </div>
                

                <button type="button" className="btn btn-primary w-100 rounded-4 py-3 fw-semibold">
                  Share Referral Link
                </button>
              </div>
            </article>
          </div>

          <div className="col-12 col-md-6">
            <article className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <h2 className="fw-bold mb-4" style={{ fontSize: '2rem' }}>
                  How to Earn Points
                </h2>

                <div className="d-flex gap-3 mb-4">
                  <span className="text-primary">
                    <Icon type="clock" color="#2563eb" />
                  </span>
                  <div>
                    <div className="fw-medium" style={{ fontSize: '1.2rem' }}>
                      Study Sessions
                    </div>
                    <div className="text-secondary" style={{ fontSize: '1.1rem' }}>
                      10 points per hour
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <span>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                      <circle cx="9.5" cy="7" r="3" />
                      <path d="M20 8v6" />
                      <path d="M23 11h-6" />
                    </svg>
                  </span>
                  <div>
                    <div className="fw-medium" style={{ fontSize: '1.2rem' }}>
                      Referrals
                    </div>
                    <div className="text-secondary" style={{ fontSize: '1.1rem' }}>
                      50 points per friend
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-3 mt-4">
                  <span>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ea580c"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 8h8v6a4 4 0 0 1-4 4 4 4 0 0 1-4-4V8Z" />
                      <path d="M15 9h2a2 2 0 1 1 0 4h-2" />
                      <path d="M9 4v2" />
                      <path d="M12 4v2" />
                    </svg>
                  </span>
                  <div>
                    <div className="fw-medium" style={{ fontSize: '1.2rem' }}>
                      Purchases
                    </div>
                    <div className="text-secondary" style={{ fontSize: '1.1rem' }}>
                      10 points per $5 spent
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoyaltyRewards;
