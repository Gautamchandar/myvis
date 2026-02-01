import React, {useState, useEffect} from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/AboutPage'
import Projects from './components/Projects'
import Experience from './components/Experiences'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'


const App = () => {
   const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleMode = () => {
    setIsDarkMode(prev => !prev)
  }

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [isDarkMode])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>
        <Navbar isDarkMode={isDarkMode} toggleMode={toggleMode} />
        <div className='mt-10'>
        <Home isDarkMode={isDarkMode} toggleMode={toggleMode}/>
        </div>
        <Footer isDarkMode={isDarkMode} toggleMode={toggleMode}/>
      </div>
    },
    {
      path: '/about',
      element: <div>
        <Navbar isDarkMode={isDarkMode} toggleMode={toggleMode}/>
        <div className='mt-10'>
        <About isDarkMode={isDarkMode} toggleMode={toggleMode}/>
        </div>
        <Footer isDarkMode={isDarkMode} toggleMode={toggleMode}/>
      </div>
    },
    {
      path: '/projects',
      element: <div>
        <Navbar isDarkMode={isDarkMode} toggleMode={toggleMode}/>
        <div className='mt-10'>
        <Projects isDarkMode={isDarkMode} toggleMode={toggleMode}/>
        </div>
        <Footer isDarkMode={isDarkMode} toggleMode={toggleMode}/>
      </div>
    },
    {
      path: '/experiences',
      element: <div>
        <Navbar isDarkMode={isDarkMode} toggleMode={toggleMode}/>
        <div className='mt-10'>
        <Experience isDarkMode={isDarkMode} toggleMode={toggleMode}/>
        </div>
        <Footer isDarkMode={isDarkMode} toggleMode={toggleMode}/>
      </div>
    },
    {
      path: '/certificates',
      element: <div>
        <Navbar isDarkMode={isDarkMode} toggleMode={toggleMode}/>
        <div className='mt-10'>
        <Certificates isDarkMode={isDarkMode} toggleMode={toggleMode}/>
        </div>
        <Footer isDarkMode={isDarkMode} toggleMode={toggleMode}/>
      </div>
    },
    {
      path: '/contact',
      element: <div>
        <Navbar isDarkMode={isDarkMode} toggleMode={toggleMode}/>
        <div className='mt-10'>
        <Contact isDarkMode={isDarkMode} toggleMode={toggleMode}/>
        </div>
        <Footer isDarkMode={isDarkMode} toggleMode={toggleMode}/>
      </div>
    }
    
  ])
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
