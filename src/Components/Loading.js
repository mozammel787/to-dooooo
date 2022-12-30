import React from 'react';

const Loading = () => {
    return (
        <>
            <div className="left-0 top-0 h-screen w-screen fixed z-10 overflow-hidden bg-white dark:bg-gray-900">
                <div className="w-16  h-16 border-4 border-dashed rounded-full animate-spin border-blue-500 mx-auto mt-80">
                </div>
            </div>

        </>
    );
};

export default Loading;