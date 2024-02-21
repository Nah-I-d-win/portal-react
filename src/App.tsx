import { useCallback, useEffect, useRef } from "react";
import "./App.css";
import { color } from "./fractals/fractal";
import { Mandelbrot } from "./fractals/mandelbrot";
import { NewtonRaphsonZ3 } from "./fractals/newton_raphson_z3";

function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (context) {
            draw(context); 
        }
    }, []);

    const debounce = (func: any, delay: number) => {
        let timer: number;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    function draw(context: CanvasRenderingContext2D) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const width = canvas.width;
        const height = canvas.height;
        const imageData = context.getImageData(0, 0, width, height);

        // const mandelbrot = new Mandelbrot();
        const newtonRaphson = new NewtonRaphsonZ3();
        const data = imageData.data;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const i = (y * width + x) * 4;

                // TODO: Adjust these values to change the portion of the Mandelbrot set being viewed
                const cx = (x / width) * 3.5 - 2.5;
                const cy = (y / height) * 2 - 1;

                const [_, t] = newtonRaphson.generate(cx, cy);
                const [r, g, b] = color((2.0 * t + 0.5) % 1.0);

                data[i] = r; // red
                data[i + 1] = g; // green
                data[i + 2] = b; // blue
                data[i + 3] = 255; // alpha
            }
        }

        context.putImageData(imageData, 0, 0);
    }

    useEffect(() => {
        resizeCanvas();

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d", { willReadFrequently: true });
        if (!context) return;

        draw(context);

        const debouncedResize = debounce(() => {
            resizeCanvas();
        }, 250); 

        window.addEventListener("resize", debouncedResize);

        return () => {
            window.removeEventListener("resize", debouncedResize);
        };
    }, [resizeCanvas]);

    return (
        <div>
            <canvas ref={canvasRef} />
        </div>
    );
}

export default App;
