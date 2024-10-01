import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      {/*<Provider store={store} context={ReactReduxContext}>*/}
    <App />
  </React.StrictMode>
)