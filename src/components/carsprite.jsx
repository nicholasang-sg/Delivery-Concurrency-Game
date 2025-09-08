import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Sprite } from 'react-konva';
import Konva from 'konva';
import redCarSprite from '../assets/RedCarsSpritesheet.png';

function CarSprite() {
  const spriteRef = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = redCarSprite;
    img.onload = () => setImage(img);
  }, []);

  useEffect(() => {
    if (spriteRef.current) {
      spriteRef.current.start();
    }
  }, [image]);

  const animations = {
    drive: [
        0, 0, 256, 256,
        256, 0, 256, 256,
        512, 0, 256, 256,
        0, 256, 256, 256,
        256, 256, 256, 256,
        512, 256, 256, 256,
        0, 512, 256, 256,
        256, 512, 256, 256,
    ]
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {image && (
          <Sprite
            ref={spriteRef}
            x={50}
            y={50}
            image={image}
            animation="drive"
            animations={animations}
            frameRate={5}
            frameIndex={0}
          />
        )}
      </Layer>
    </Stage>
  );
}

export default CarSprite;