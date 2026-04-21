import {
  Component,
  input,
  signal,
  output,
  viewChild,
  ElementRef,
  AfterViewInit,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawer-layout',

  imports: [CommonModule],
  templateUrl: './drawer-layout.component.html',
})
export class DrawerLayoutComponent implements AfterViewInit {
  drawerId = input<string>('drawer');
  sidebarWidth = input<string>('20rem');
  closeLabel = input<string>('Close drawer');
  initiallyOpen = input<boolean>(true);
  sidebarTitle = input<string>('');

  drawerCheckbox = viewChild<ElementRef<HTMLInputElement>>('drawerCheckbox');

  isOpen = signal(this.initiallyOpen());

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
