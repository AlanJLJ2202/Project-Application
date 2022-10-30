import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})


export class DndDirective {

  @HostBinding('class.fileover') fileOver: boolean;

  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    console.log('dragover');
  }

  @HostListener('dragleave', ['$event']) onDragEnter(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    console.log('dragleave');
  }

  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = evt.dataTransfer.files;
    console.log('drop');
  }

}


