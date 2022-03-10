import React from "react";
import test1 from "../../src/components/test1.jpeg";
import test2 from "../../src/components/test2.jpg";
const Home = () => {
  
  return (
    <div>
    <h2 className="text-center">SELECT MEMBER</h2>
    {/* <img src="test1.png" class="rounded float-left" alt="test1"></img> */}
    <div className="image-click">
    
    <a href='/employees'><img src={test1} class="rounded float-left" alt="pic1" style={{ paddingLeft: 10 ,maxWidth: 150}}></img></a>
    </div>
    <img src={test2} class="rounded float-left" alt="pic2" style={{paddingLeft: 10 ,maxWidth: 150}}></img>
    
    </div>
  );
};

export default Home;
