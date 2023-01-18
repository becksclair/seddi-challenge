import React, { ReactElement } from 'react'
import Challenge from './components/Challenge'
import './App.css'

const App = (): ReactElement => {
    return (
        <div className="App">
            <h1>SEDDI Test</h1>

            <Challenge />
        </div>
    )
}

export default App
