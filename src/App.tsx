import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Particles from "react-tsparticles";
import { Home, FormSlice } from './components';
import PrettyPrint from './components/PrettyPrint';
import { Navigate } from 'react-router-dom'


const ParticlesOptions: any = {
  background: {
    color: "#181A18"
  },
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",
    events: {
      resize: true
    }
  },
  particles: {
    color: {
      value: "#ffffff"
    },
    number: {
      density: {
        enable: true,
        area: 1000
      },
      limit: 0,
      value: 300
    },
    opacity: {
      animation: {
        enable: true,
        minimumValue: 0.05,
        speed: 1,
        sync: false
      },
      random: {
        enable: true,
        minimumValue: 0.05
      },
      value: 1
    },
    shape: {
      type: "star"
    },
    size: {
      random: {
        enable: true,
        minimumValue: 0.5,
        value: 1
      }
    }
  }
}

function App() {
  const formData = useSelector((state: any) => state);

  const particlesLoaded = React.useCallback(async (container: any) => {
      await console.log(container);
  }, []);

  return (
    <div className="App">
      <Particles
        id="tsparticles"
        loaded={particlesLoaded}
        options={ParticlesOptions}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to='/step/1' replace={true} />} />
          <Route path="/step/:id" element={<FormSlice />} />
          {formData.success && <Route path="/print" element={<PrettyPrint />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
