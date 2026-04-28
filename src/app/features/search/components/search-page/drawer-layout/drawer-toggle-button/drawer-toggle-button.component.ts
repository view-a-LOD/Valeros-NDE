import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, IconType } from '@ng-icons/core';

@Component({
  selector: 'app-drawer-toggle-button',

  imports: [CommonModule, NgIcon],
  templateUrl: './drawer-toggle-button.component.html',
})
export class DrawerToggleButtonComponent {
  drawerId = input<string>('drawer');
  labelWhenOpen = input<string>('Verberg filters');
  labelWhenClosed = input<string>('Toon filters');
  buttonClass = input<string>('btn');
  isOpen = input<boolean>(true);
  icon = input<IconType>();
  iconSize = input<string>('16');
  iconOnly = input<boolean>(false);

  toggle = output<void>();

  onToggle() {
    this.toggle.emit();
  }
}
