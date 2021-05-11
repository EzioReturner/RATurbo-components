import React from 'react';
import Search from 'react-feather/dist/icons/search'

const NavSearch = props => {
  return <div className="nav-search">
    <Search className="nav-search-icon"/>
    <input className="nav-search-input" placeholder="在 RATurbo 中搜索"/>
  </div>;
}

export default NavSearch;