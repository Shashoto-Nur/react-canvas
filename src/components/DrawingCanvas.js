import { useState, useRef } from 'react';
import { Stage, Layer, Line } from 'react-konva';

const DrawingCanvas = () =>
    {

        const [lines, setLines] = useState([]);
        const isDrawing = useRef(false);
        
        const handleMouseDown = (event) =>
        {
            isDrawing.current = true;
            const pos = event.target.getStage().getPointerPosition();
            setLines([...lines, { points: [pos.x, pos.y] }]);
        };
        
        const handleMouseMove = (event) =>
        {
            // no drawing - skipping
            if (!isDrawing.current) return;
            
            const stage = event.target.getStage();
            const point = stage.getPointerPosition();
        
            // To draw line
            let lastLine = lines[lines.length - 1];
            
            if(lastLine)
            {
                // add point
                lastLine.points = lastLine.points.concat([point.x, point.y]);

                // replace last
                lines.splice(lines.length - 1, 1, lastLine);
                setLines(lines.concat());
            }
            
        };
    

        return (
            <div className=" text-center text-dark">
                <Stage width={600} height={600} onMouseDown={handleMouseDown}
                    onMousemove={handleMouseMove} onMouseup={ () => { isDrawing.current = false; } }
                    className="canvas-stage" >
                    <Layer>
                        {
                            lines.map(
                                (line, index) =>
                                (
                                    <Line key={ index } points={ line.points } stroke="#df4b26"
                                    strokeWidth={2} tension={0.5} lineCap="round"
                                    globalCompositeOperation=
                                    { line.tool === 'eraser' ? 'destination-out' : 'source-over' }
                                    />
                                )
                            )
                        }
                    </Layer>
                </Stage>
            </div>
        )
    }

export default DrawingCanvas;