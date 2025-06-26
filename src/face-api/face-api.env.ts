import * as canvas from 'canvas';
import * as faceapi from 'face-api.js';

const { Canvas, Image, ImageData } = canvas;

faceapi.env.monkeyPatch({
  Canvas: Canvas as any,
  Image: Image as any,
  ImageData: ImageData as any,
});

export { faceapi };

export const csToNetInput = (input: canvas.Image): faceapi.TNetInput => {
  return input as unknown as faceapi.TNetInput;
};
