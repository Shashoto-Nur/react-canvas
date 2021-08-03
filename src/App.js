import './App.css';
import DrawingCanvas from './components//DrawingCanvas';

const App = () => 
  {
    return (
      <>
        <h1>React Canvas</h1>

        <div className="App">
          <DrawingCanvas />
        </div>
      </>
    );
  };

export default App;
