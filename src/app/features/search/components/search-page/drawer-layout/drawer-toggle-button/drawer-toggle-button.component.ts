import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawer-toggle-button',

  imports: [CommonModule],
  templateUrl: './drawer-toggle-button.component.html',
})
export class DrawerToggleButtonComponent {
  drawerId = input<string>('drawer');
  labelWhenOpen = input<string>('Verberg filters');
  labelWhenClosed = input<string>('Toon filters');
  buttonClass = input<string>('btn btn-sm');
  isOpen = input<boolean>(true);

  toggle = output<void>();

  onToggle() {
    this.toggle.emit();
  }
}
