import { Injectable } from '@angular/core';
import { fabric } from 'fabric';

@Injectable({
  providedIn: 'root'
})
export class FabricCanvasService {

  createCanvas(canvasId: string, width: number, height: number): fabric.Canvas {
    const canvas = new fabric.Canvas(canvasId, {
      selection: false
    });
    canvas.setWidth(width);
    canvas.setHeight(height);
    return canvas;
  }
}