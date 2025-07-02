import React from 'react';

// Simple card component for boxed content
function Card ({ title, children }) {
    return (
        <div className="bg-white rounded shadow p-4 mb-4">
            {/* Card title */}
            { title && <h2 className='font-bold text-lg mb-2'>{title}</h2> }'

            {/* Card Content */}
            { children }
        </div>
    );
}

export default Card;