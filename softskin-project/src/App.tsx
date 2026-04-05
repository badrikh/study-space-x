import React from 'react';
import './App.css';

// استيراد المكونات (Components)
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchSection from './components/SearchSection';
import CourseCard from './components/CourseCard';
import BeautySection from './components/BeautySection';

const App: React.FC = () => {
  // مصفوفة بيانات الكورسات (نفس بياناتك الأصلية)
  const courses = [
    { 
      id: 1, 
      image: '/images/card1.webp', 
      instructorImg: 'https://randomuser.me/api/portraits/men/32.jpg', 
      instructorName: 'Dr. Harald Helfeger', 
      title: 'Effective use and understanding of clinical ....' 
    },
    { 
      id: 2, 
      image: '/images/card2.jpg', 
      instructorImg: 'https://randomuser.me/api/portraits/men/45.jpg', 
      instructorName: 'Dr. Harald Helfeger', 
      title: 'Effective use and understanding of clinical ....', 
      oldPrice: '399$', 
      newPrice: '299$' 
    },
    { 
      id: 3, 
      image: '/images/card3.jpg', 
      instructorImg: 'https://randomuser.me/api/portraits/men/52.jpg', 
      instructorName: 'Dr. Harald Helfeger', 
      title: 'Effective use and understanding of clinical ....', 
      newPrice: '149$' 
    },
    { 
      id: 4, 
      image: '/images/card4.webp', 
      instructorImg: 'https://randomuser.me/api/portraits/men/61.jpg', 
      instructorName: 'Dr. Harald Helfeger', 
      title: 'Effective use and understanding of clinical ....', 
      newPrice: '149$' 
    },
  ];

  return (
    <div className="App">
      {/* 1. الهيدر */}
      <Navbar />

      {/* 2. البانر الرئيسي */}
      <Hero />

      {/* 3. عنوان وصندوق البحث */}
      <SearchSection />

      {/* 4. قسم عرض الكورسات */}
      <section className="cards-section container py-5">
        <div className="row g-4">
          {courses.map(course => (
            <CourseCard 
              key={course.id}
              image={course.image}
              instructorImg={course.instructorImg}
              instructorName={course.instructorName}
              title={course.title}
              oldPrice={course.oldPrice}
              newPrice={course.newPrice}
            />
          ))}
        </div>
      </section>

      {/* 5. قسم منتجات التجميل (Beauty Section) */}
      <BeautySection />

      {/* هنا سنضيف قسم الـ Success Stories والـ Footer في الخطوة القادمة */}
    </div>
  );
};

export default App;