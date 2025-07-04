import React from 'react'

const Button = ({ text, logo: Logo, onClick }) => {
  return (
    <div 
    onClick={onClick}
    className="px-4 py-2 flex items-center gap-2 border rounded-lg bg-[var(--input-color)] text-black cursor-pointer">
      <Logo />
      {text}
    </div>
  );
}

export default Button