import React, { useState, useEffect } from 'react';

const SlideShow = () => {
  const reviewsData = [
    {
      review: "The CIENCE People, Process, Technology model is turnkey—fast to start and easy to scale, from 1 SDR Team to 25 or more. The continuity of repeatable, daily processes provides a steady stream of qualified appointments you can build your business around.",
      name: "Abdullah Shehzad",
    },
    {
      review: "CIENCE's innovative model helps us scale efficiently and focus on the right leads, turning them into clients. Their professionalism and consistency are unmatched.",
      name: "Fatima Khan",
    },
    {
      review: "Working with CIENCE has been a game-changer for our business. Their team delivers results with precision and clarity, helping us achieve our sales goals.",
      name: "Ali Raza",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [reviewsData.length]);

  const Reviews = ({ review, name }) => {
    return (
      <section className="flex flex-col gap-5">
        <h1 className="font-sans text-white text-4xl font-bold">{review}</h1>
        <p className="text-white text-xl font-base font-normal">{name}</p>
      </section>
    );
  };

  return (
    <section className="h-[600px] flex justify-center items-center text-center">
      <div>
        <Reviews
          review={reviewsData[currentIndex].review}
          name={reviewsData[currentIndex].name}
        />
      </div>
    </section>
  );
};

export default SlideShow;
