import React, {useEffect} from 'react';

import HomeBanner from './HomeBanner';
import Content from './Content';
// import Selling from './Selling';
import Deal from './Deal';
import Tips from './Tips';
import {useLocation} from 'react-router-dom'


function Home() {
    const {pathname} = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="Home">
       
        <HomeBanner/>
        <div className="wrapper-content-selling">
            {/* Content */}
                <Content/>
            {/* Selling */}
                {/* <Selling/> */}
        </div>
  
        <div className="backround-deal-tips">
            {/* Deal */}
            <Deal/>
            {/* Tips */}
            <Tips/>
        </div>
        
        </div>
  );
}

export default Home;
