import React from 'react';

const BeautySection: React.FC = () => {
  return (
    <section className="beauty-section-container">
      <div className="container">
        {/* صف النصوص العلوي */}
        <div className="row beauty-text-content">
          <div className="col-lg-6">
            <h1 className="beauty-title mb-4">
              Beauty products <br /> of your own!
            </h1>
            <p className="text-muted mb-4" style={{ maxWidth: '450px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
          </div>
          
          <div className="col-lg-6 d-flex flex-column justify-content-end align-items-lg-end">
            <div className="features-grid mb-4">
               <div><CheckIcon /> Pellentesque suscipit</div>
               <div><CheckIcon /> incididunt ut labore</div>
               <div><CheckIcon /> Curabitur ac odio</div>
               <div><CheckIcon /> Nulla ligula metus</div>
               <div><CheckIcon /> Nulla ligula metus</div>
               <div><CheckIcon /> Nulla ligula metus</div>
            </div>
            <button className="read-btn" style={{ alignSelf: 'flex-end' }}>Read more</button>
          </div>
        </div>
      </div>

      {/* حاوية الصورة السفلية */}
      <div className="beauty-image-wrapper">
        <img src="/images/soap_flavours.jpg" alt="Beauty Products" />
      </div>
    </section>
  );
};

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#97ac4c" className="me-2" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </svg>
);

export default BeautySection;