import React from 'react';

const VideoSection = ({ selectedRun }) => {
  if (!selectedRun) return null;

  return (
    <section className="w-full h-1/2 flex items-center justify-center bg-gray-800 relative">
      <video src={selectedRun.videoUrl} controls className="w-full h-full"></video>
    </section>
  );
};

export default VideoSection;