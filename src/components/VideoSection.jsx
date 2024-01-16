import React from 'react';

const VideoSection = ({ selectedRun }) => {
  if (!selectedRun) return null;

  return (
    <section className="w-full h-1/2 flex items-center justify-center bg-gray-800 relative">
      <video src={selectedRun.videoUrl} controls autoPlay className="w-full h-full rounded"></video>
    </section>
  );
};

export default VideoSection;