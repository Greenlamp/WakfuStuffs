import React from 'react';
import Search from './Search'

const MainSection = ({stuffs, actions, page, total, size_page, myFilter}) =>(
      <div>
        <h2 align="center">Welcome to Wakfu Stuffs!</h2>
        <hr />
        <Search stuffs={stuffs} page={page} actions={actions} total={total} size_page={size_page} myFilter={myFilter}/>
      </div>
)
export default MainSection