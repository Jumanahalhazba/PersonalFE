import React from "react";
import test1 from "../../src/components/test1.jpeg";
import test2 from "../../src/components/test2.jpg";
import {Modal,Button} from 'react-bootstrap'; 

const Home = () => {
  
  return (
    <div>
    <h2 className="text-center">SELECT MEMBER</h2>
    
    <div className="image-click">
    <a href='/employees'><img src={test1} class="rounded float-left" alt="pic1" style={{ paddingLeft: 10 ,maxWidth: 150}}></img></a>
    </div>
    
    <img src={test2} class="rounded float-left" alt="pic2" style={{paddingLeft: 10 ,maxWidth: 150}}></img>

    {/* <div> 

    <Button className="modal-test">Open Modal</Button>  

    <Modal show={false}> </Modal>

    <Modal.Header>Modal Head Part</Modal.Header>

    <Modal.Body> React Modal Working </Modal.Body>

    <Modal.Footer>
      <Button> Close </Button>
    </Modal.Footer>

    </div> */}

    {/* <div>
      <a href = {link}>
        <img src= {image} alt= 'icon' />
      </a>
    </div>  */}

    <body>
        <label>View Photo</label>
        Title: <span text="${title}">name</span>
        <img alt="sample" src="*{'data:image/png;base64,'+image}" />
    </body>

    </div>
    
  );
};

export default Home;
