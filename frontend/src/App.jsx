import { useEffect, useState } from 'react'
import ellipse1 from './assets/login/ellipse-1.png'
import frame from './assets/login/frame.svg'
import polygon1 from './assets/login/polygon-1.svg'
import polygon2 from './assets/login/polygon-2.svg'
import polygon3 from './assets/login/polygon-3.svg'
import vector3 from './assets/login/vector3.png'
import background from './assets/login/background.png'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState({});

  useEffect( () => {
    axios.get('http://localhost:5000/home')
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
}, []);

return (
  <div className="log-in-user">
    <div className="overlap-wrapper">
      <div className="overlap">
        <div className="overlap-group">
          <img className="rectangle" alt="Rectangle" src={background} />
          <div className="div" />
          <img className="polygon" alt="Polygon" src={polygon1} />
          <img className="img" alt="Polygon" src={polygon2} />
          <img className="polygon-2" alt="Polygon" src={polygon2} />
          <img className="polygon-3" alt="Polygon" src={polygon2} />
          <img className="polygon-4" alt="Polygon" src={polygon1} />
          <img className="polygon-5" alt="Polygon" src={polygon1} />
          <img className="polygon-6" alt="Polygon" src={polygon1} />
          <img className="polygon-7" alt="Polygon" src={polygon3} />
          <img className="polygon-8" alt="Polygon" src={polygon3} />
          <img className="polygon-9" alt="Polygon" src={polygon3} />
          <div className="rectangle-2" />
          <div className="rectangle-3" />
          <div className="rectangle-4" />
          <div className="login-button" />
          <img className="register-button" />
          <div className="text-wrapper">username</div>
          <div className="text-wrapper-2">password</div>
          <div className="text-wrapper-3">log in</div>
          <div className="text-wrapper-4">register</div>
          <div className="rectangle-7" />
          <div className="frame">
            <div className="overlap-group-2">
              <div className="div-wrapper">
                <div className="text-wrapper-5">Skip to content</div>
              </div>
              <div className="frame-wrapper">
                <div className="frame-2">
                  <div className="auto-layout">
                    <div className="frame-3" />
                    <div className="frame-4">
                      <div className="auto-layout-2">
                        <div className="text-wrapper-6">Log in</div>
                      </div>
                      <div className="auto-layout-wrapper">
                        <div className="auto-layout-3">
                          <div className="text-wrapper-6">Main Menu</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img className="ellipse" alt="Ellipse" src={ellipse1} />
                </div>
              </div>
            </div>
          </div>
          <div className="frame-5">
            <img className="frame-6" alt="Frame" src={frame} />
            <div className="frame-7">
              <div className="text-wrapper-7">JONK FOOD IT</div>
            </div>
          </div>
          <div className="text-wrapper-8">Log in</div>
        </div>
        <img className="vector" alt="Vector" src={vector3} />
      </div>
    </div>
  </div>
);
};

export default App
