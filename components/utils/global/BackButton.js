import React from 'react';

const BackButton = ({ id }) => {
    return (
        <button
            type="button"
            style={{ width: '50px', height: '50px',backgroundColor:" rgb(223 235 249)" }} // Adjust width and height as needed
            className="text-blue"
            data-bs-toggle="offcanvas"
            data-bs-target={`#${id}`}
            aria-controls="offfinancialcanvasRight"
        >
<i className="backbtn bi bi-arrow-left text-black" ></i>
        </button>
    );
};

export default BackButton;
