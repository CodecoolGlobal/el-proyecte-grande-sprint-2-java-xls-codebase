import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
fetch("/news?query=ukraine", {
    headers: {
        'Content-Type': 'application/json',
    }
})
    .then(res => res.json())
    .then(
        (result) => {
          console.log(result);
        })
export default App;
