import {
  Component,
  input,
  signal,
  viewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerToggleButtonComponent } from './drawer-toggle-button/drawer-toggle-button.component';
import { featherX } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-drawer-layout',

  imports: [CommonModule, DrawerToggleButtonComponent],
  templateUrl: './drawer-layout.component.html',
})
export class DrawerLayoutComponent implements AfterViewInit {
  drawerId = input<string>('drawer');
  sidebarWidth = input<string>('18rem');
  closeLabel = input<string>('Close drawer');
  initiallyOpen = input<boolean>(true);
  sidebarTitle = input<string>('');

  drawerCheckbox = viewChild<ElementRef<HTMLInputElement>>('drawerCheckbox');

  isOpen = signal(this.initiallyOpen());

  protected readonly featherX = featherX;

  ngOnInit() {
    this.isOpen.set(this.initiallyOpen());
  }

  ngAfterViewInit() {
    const checkboxRef = this.drawerCheckbox();
    if (checkboxRef) {
      const checkbox = checkboxRef.nativeElement;
      checkbox.addEventListener('change', () => {
        this.isOpen.set(checkbox.checked);
      });
    }
  }

  toggleDrawer() {
    this.isOpen.update((value) => !value);
  }
}
