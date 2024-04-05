import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FabricCanvasService } from '../fabric-canvas.service';
import { fabric } from 'fabric';

@Component({
  selector: 'app-canvas-drawing',
  templateUrl: './canvas-drawing.component.html',
  styleUrls: ['./canvas-drawing.component.css'],
})
export class CanvasDrawingComponent implements OnInit {
  canvas: any;
  fabric: any;
  canvasElement: any;

  constructor(private fabricCanvasService: FabricCanvasService) {}

  ngOnInit(): void {
    this.canvas = this.fabricCanvasService.createCanvas(
      'canvasDrawing',
      600,
      400
    );
  }

  selectedShape: any;

  ngAfterViewInit(): void {
    this.canvas = new fabric.StaticCanvas(this.canvasElement.nativeElement);

    this.canvas.on('mouse:down', (options: { e: any }) => {
      const pointer = this.canvas.getPointer(options.e);
      this.selectedShape = this.canvas.getObjectAt(pointer);
    });

    this.canvas.on('object:moving', () => {
      this.updateObjectProperties();
    });

    this.canvas.on('object:scaling', () => {
      this.updateObjectProperties();
    });
  }

  drawCircle(): void {
    const circle = new fabric.Circle({
      radius: 50,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 2,
      selectable: true,
      left: 100,
      top: 100,
    });
    this.canvas.add(circle);
    this.selectedShape = circle;
  }

  drawRectangle(): void {
    const rectangle = new fabric.Rect({
      width: 100,
      height: 50,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 2,
      selectable: true,
      left: 100,
      top: 100,
    });
    this.canvas.add(rectangle);
    this.selectedShape = rectangle;
  }

  drawTriangle(): void {
    const triangle = new fabric.Triangle({
      width: 100,
      height: 50,
      fill: 'blue',
      stroke: 'black',
      strokeWidth: 2,
      selectable: true,
      left: 100,
      top: 100,
    });
    this.canvas.add(triangle);
    this.selectedShape = triangle;
  }

  deleteShape(): void {
    const index = this.canvas.getObjects().indexOf(this.selectedShape);
    this.canvas.remove(this.selectedShape);
    this.selectedShape =
      this.canvas.getObjects()[index - 1] || this.canvas.getObjects()[0];
  }

  updateObjectProperties(): void {
    const fillColor = document.getElementById('fill') as HTMLInputElement;
    const strokeColor = document.getElementById('stroke') as HTMLInputElement;

    this.selectedShape.set('fill', fillColor.value);
    this.selectedShape.set('stroke', strokeColor.value);

    this.canvas.renderAll();
  }
  logValue(value: any): void {
    console.log(value);
  }
}
