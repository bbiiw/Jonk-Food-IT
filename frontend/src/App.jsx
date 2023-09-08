import { useState } from 'react'
import poly1 from './assets/poly1.png'
import poly2 from './assets/Polygon 4.png'
import poly3 from './assets/Polygon 5.png'
import poly4 from './assets/Polygon 6.png'
import poly5 from './assets/Polygon 7.png'
import poly6 from './assets/Polygon 9.png'
import poly7 from './assets/Polygon 10.png'
import poly8 from './assets/Polygon 12.png'
import reg4 from './assets/Rectangle 4.png'
import reg5 from './assets/Rectangle 5.png'
import logo from './assets/Ellipse 1.png'
import bg from './assets/bg.png'
import vec from './assets/Vector 3.png'
import './Login.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="log-in-user">
    <div className="overlap-wrapper">
      <div className="overlap">
        <img className="rectangle" alt="Rectangle" src={bg} />
        <div className="div" />
        <img className="polygon" alt="Polygon" src={poly3} />
        <img className="img" alt="Polygon" src={poly1} />
        <img className="polygon-2" alt="Polygon" src={poly4} />
        <img className="polygon-3" alt="Polygon" src={poly6} />
        <img className="polygon-4" alt="Polygon" src={poly2} />
        <img className="polygon-5" alt="Polygon" src={poly3} />
        <img className="polygon-6" alt="Polygon" src={poly1} />
        <img className="polygon-7" alt="Polygon" src={poly5} />
        <img className="polygon-8" alt="Polygon" src={poly3} />
        <img className="polygon-9" alt="Polygon" src={poly7} />
        <img className="polygon-10" alt="Polygon" src={poly8} />
        <div className="rectangle-2" />
        <div className="rectangle-3" />
        <div className="rectangle-4" />
        <img className="rectangle-5" alt="Rectangle" src={reg4} />
        <img className="rectangle-6" alt="Rectangle" src={reg5} />
        <div className="text-wrapper">Username</div>
        <div className="password">Password</div>
        <div className="text-wrapper-2">Log in</div>
        <div className="text-wrapper-3">Register</div>
        <img className="vector" alt="Vector" src={vec} />
        <div className="rectangle-7" />
        <div className="frame">
          <div className="overlap-group">
            <div className="div-wrapper">
              <div className="text-wrapper-4">Skip to content</div>
            </div>
            <div className="frame-2">
              <div className="overlap-group-2">
                <div className="auto-layout-wrapper">
                  <div className="auto-layout">
                    <div className="frame-3" />
                  </div>
                </div>
                <div className="frame-4">
                  <div className="auto-layout-2">
                    <div className="text-wrapper-5">Log in</div>
                  </div>
                  <div className="frame-5">
                    <div className="auto-layout-3">
                      <div className="text-wrapper-5">Main Menu</div>
                    </div>
                  </div>
                </div>
              </div>
              <img className="ellipse" alt="Ellipse" src={logo} />
            </div>
          </div>
        </div>
        <div className="frame-7">      
          <div className="text-wrapper-6">JONK FOOD IT</div>
        </div>
        <div className="text-wrapper-7">Log in</div>
      </div>
    </div>
   </div>
  )
}

export default App
