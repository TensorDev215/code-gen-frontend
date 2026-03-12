import routes from './routes'
import ThemeProvider from './context/ThemeProvider'
import { RouterProvider } from 'react-router-dom'

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  )
}

export default App
