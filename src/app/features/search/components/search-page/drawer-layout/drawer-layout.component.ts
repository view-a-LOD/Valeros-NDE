import {
  Component,
  Input,
  signal,
  output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawer-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer-layout.component.html',
})
export class DrawerLayoutComponent implements AfterViewInit {
  @Input() drawerId = 'drawer';
  @Input() sidebarWidth = '20rem';
  @Input() closeLabel = 'Close drawer';
  @Input() initiallyOpen = true;
  @Input() sidebarTitle = '';

  @ViewChild('drawerCheckbox') drawerCheckbox?: ElementRef<HTMLInputElement>;

  isOpen = signal(this.initiallyOpen);

  ngOnInit() {
    this.isOpen.set(this.initiallyOpen);
  }

  ngAfterViewInit() {
    if (this.drawerCheckbox) {
      const checkbox = this.drawerCheckbox.nativeElement;
      checkbox.addEventListener('change', () => {
        this.isOpen.set(checkbox.checked);
      });
    }
  }

  toggleDrawer() {
    this.isOpen.update((value) => !value);
  }
}
