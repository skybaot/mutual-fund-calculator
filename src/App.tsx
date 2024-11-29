import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Calculator } from './components/calculator/Calculator';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Background } from './components/Background';
import { Strategies } from './pages/Strategies';
import { Savings } from './pages/Savings';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Background />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="/savings" element={<Savings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;