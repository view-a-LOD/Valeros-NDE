import { Component, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawer-toggle-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer-toggle-button.component.html',
})
export class DrawerToggleButtonComponent {
  @Input() drawerId = 'drawer';
  @Input() labelWhenOpen = 'Verberg filters';
  @Input() labelWhenClosed = 'Toon filters';
  @Input() buttonClass = 'btn btn-sm';
  @Input() isOpen = true;

  toggle = output<void>();

  onToggle() {
    this.toggle.emit();
  }
}
