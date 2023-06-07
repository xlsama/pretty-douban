import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

ReactDOM.createRoot(
  (() => {
    const app = document.createElement('div')
    document.body.replaceChildren(app)
    // document.body.append(app)
    return app
  })(),
).render(<App />)
