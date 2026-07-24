import React from 'react';
import fleurDeLis from '../assets/fleur-de-lis.png';

const FleurDeLisIcon = ({ className = '', size = 'md', variant = 'purple' }) => {
  let sizeClasses = '';
  let imgClasses = '';
  
  switch(size) {
    case 'xs': // w-5 h-5 (badges)
      sizeClasses = '';
      imgClasses = 'w-5 h-5 object-contain';
      break;
    case 'sm': // w-8 h-8 (small grids)
      sizeClasses = 'w-8 h-8 rounded-lg';
      imgClasses = 'w-4 h-4 object-contain';
      break;
    case 'md': // w-12 h-12 (normal list items)
      sizeClasses = 'w-12 h-12 rounded-xl';
      imgClasses = 'w-6 h-6 object-contain';
      break;
    case 'lg': // w-14 h-14 (larger cards)
      sizeClasses = 'w-14 h-14 rounded-2xl';
      imgClasses = 'w-8 h-8 object-contain';
      break;
    case 'xl': // w-16 h-16 (service grid items)
      sizeClasses = 'w-16 h-16 rounded-2xl';
      imgClasses = 'w-9 h-9 object-contain';
      break;
    case '2xl': // w-20 h-20 (big features)
      sizeClasses = 'w-20 h-20 rounded-2xl';
      imgClasses = 'w-10 h-10 object-contain';
      break;
    case '3xl': // w-28 h-28 or w-32 h-32 (visual panel centers)
      sizeClasses = 'w-28 h-28 rounded-full';
      imgClasses = 'w-14 h-14 object-contain';
      break;
    case 'raw-lg': // just img but large (like shield or background icons)
      sizeClasses = '';
      imgClasses = 'w-40 h-40 object-contain';
      break;
    case 'raw-xl': // just img but extra large
      sizeClasses = '';
      imgClasses = 'w-24 h-24 object-contain';
      break;
    default:
      sizeClasses = 'w-12 h-12 rounded-xl';
      imgClasses = 'w-6 h-6 object-contain';
  }

  let bgClasses = '';
  if (variant === 'purple') {
    bgClasses = 'bg-gradient-to-br from-[#5B2C6F] to-[#3E1A4D] text-white shadow-lg flex items-center justify-center flex-shrink-0';
  } else if (variant === 'purple-solid') {
    bgClasses = 'bg-[#5B2C6F] text-white shadow-lg flex items-center justify-center flex-shrink-0';
  } else if (variant === 'transparent') {
    bgClasses = 'flex items-center justify-center flex-shrink-0';
  } else if (variant === 'white-glass') {
    bgClasses = 'bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center flex-shrink-0';
  }

  if (!sizeClasses) {
    // raw image
    return <img src={fleurDeLis} alt="Fleur-de-lis" className={`${imgClasses} ${className}`} />;
  }

  return (
    <div className={`${bgClasses} ${sizeClasses} ${className}`}>
      <img src={fleurDeLis} alt="Fleur-de-lis" className={`${imgClasses}`} />
    </div>
  );
};

export default FleurDeLisIcon;
