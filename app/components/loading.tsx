import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-violet-500/75 z-50">
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-l-4 border-white border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
