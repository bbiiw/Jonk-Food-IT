import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
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
          <img className="rectangle" alt="Rectangle" src="rectangle-140.png" />
          <div className="div" />
          <img className="polygon" alt="Polygon" src="polygon-1.svg" />
          <img className="img" alt="Polygon" src="image.svg" />
          <img className="polygon-2" alt="Polygon" src="polygon-6.svg" />
          <img className="polygon-3" alt="Polygon" src="polygon-9.svg" />
          <img className="polygon-4" alt="Polygon" src="polygon-4.svg" />
          <img className="polygon-5" alt="Polygon" src="polygon-8.svg" />
          <img className="polygon-6" alt="Polygon" src="polygon-3.svg" />
          <img className="polygon-7" alt="Polygon" src="polygon-2.svg" />
          <img className="polygon-8" alt="Polygon" src="polygon-7.svg" />
          <img className="polygon-9" alt="Polygon" src="polygon-5.svg" />
          <div className="rectangle-2" />
          <div className="rectangle-3" />
          <div className="rectangle-4" />
          <div className="rectangle-5" />
          <div className="text-wrapper">username</div>
          <div className="text-wrapper-2">password</div>
          <div className="text-wrapper-3">log in</div>
          <img className="rectangle-6" alt="Rectangle" src="rectangle-5.png" />
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
                  <img className="ellipse" alt="Ellipse" src="ellipse-1.png" />
                </div>
              </div>
            </div>
          </div>
          <div className="frame-5">
            <img className="frame-6" alt="Frame" src="frame.svg" />
            <div className="frame-7">
              <div className="text-wrapper-7">JONK FOOD IT</div>
            </div>
          </div>
          <div className="text-wrapper-8">Log in</div>
        </div>
        <img className="vector" alt="Vector" src="vector-3.svg" />
      </div>
    </div>
  </div>
);
};

export default App
