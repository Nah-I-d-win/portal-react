import FractalRenderer from "./components/FractalRenderer";
import { NewtonRaphsonZ3 } from "./fractals/newton_raphson_z3";

function App() {
  return (
    <div>
      <FractalRenderer
        fractal={new NewtonRaphsonZ3()}
        width={300}
        height={300}
      />
    </div>
  );
}

export default App;
