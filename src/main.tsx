import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

document.body.innerHTML = ''

ReactDOM.createRoot(
  (() => {
    const app = document.createElement('div')
    document.body.replaceChildren(app)
    return app
  })(),
).render(<App />)
