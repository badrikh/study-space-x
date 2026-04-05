import React from 'react';

// تعريف أنواع البيانات (Props) اللي رح يستقبلها الكارد
interface CourseProps {
  image: string;
  instructorImg: string;
  instructorName: string;
  title: string;
  oldPrice?: string; // علامة الاستفهام تعني أن السعر القديم اختياري
  newPrice?: string;
}

const CourseCard: React.FC<CourseProps> = ({ image, instructorImg, instructorName, title, oldPrice, newPrice }) => {
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="course-card">
        <div className="card-img">
          <img src={image} alt={title} />
          <span className="badge-free">Free Subscription</span>
        </div>
        <div className="card-body-custom">
          <div className="d-flex align-items-center mb-3">
            <img src={instructorImg} className="instructor-img me-3" alt={instructorName} />
            <div>
              <small className="text-muted">Instructor</small>
              <div className="fw-bold" style={{ fontSize: '14px' }}>{instructorName}</div>
            </div>
          </div>
          <h6 className="fw-bold mb-2">{title}</h6>
          <p className="text-muted small">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button className="details-btn">Course details →</button>
            {(oldPrice || newPrice) && (
              <div className="price d-flex align-items-center gap-2">
                {oldPrice && <span className="old-price">{oldPrice}</span>}
                {newPrice && <span className="new-price">{newPrice}</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;