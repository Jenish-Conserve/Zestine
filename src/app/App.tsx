import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { HeroSection, FAQSection } from '../features/hero';
import { WhoWeAreSection } from '../features/whoWeAre';
import { Footer } from '../components/layout/Footer';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Routes>
                    <Route path="/" element={
                        <>
                            <HeroSection />
                            <WhoWeAreSection />
                            <FAQSection />
                        </>
                    } />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
