import React from 'react';

const SearchSection: React.FC = () => {
  return (
    <div className="container text-center my-5">
      <h3 className="text-secondary" style={{ fontSize: '20px' }}>
        Explore our courses catalogue
      </h3>
      
      <div className="search-box">
        <input type="text" placeholder="Search course catalog" />
        <button type="submit" className="search-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchSection;