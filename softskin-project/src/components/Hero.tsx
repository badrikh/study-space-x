import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="hero d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">
          {/* العمود الأيسر (فارغ كما في الـ HTML الأصلي) */}
          <div className="col-lg-6"></div>

          {/* العمود الأيمن (النص) */}
          <div className="col-lg-6 text-start">
            <h2 className="fw-bold display-4">Learn. Improve. Grow</h2>
            <p className="mt-3 fs-5">
              Build your skills through job-ready programs and earn
              your certification to propel your career.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;