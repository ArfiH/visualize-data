import React from 'react';

const Navbar = () => (
  <nav className="navbar">
    <input type="text" placeholder="Search" />
    <div className="profile">
      <img src="profile_picture_url" alt="Profile" />
    </div>
  </nav>
);

export default Navbar;
