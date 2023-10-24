import React from 'react';
import { Fragment, useState } from 'react'


const Header = ({ category, title }) => {
  return (
    <div>
      <p className="flex-grow text-3xl font-extrabold tracking-tight text-slate-900">
        {title}
      </p>
      {/* <p className="text-lg text-gray-400">{category}</p> */}
    </div>
  );
};

export default Header;

