import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

document.body.innerHTML = ''

window.onerror = function (message, source, lineno, colno, error) {
  console.log(message, source, lineno, colno, error)
}

ReactDOM.createRoot(
  (() => {
    const app = document.createElement('div')
    document.body.replaceChildren(app)
    return app
  })(),
).render(<App />)
