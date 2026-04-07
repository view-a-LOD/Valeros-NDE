import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  standalone: true,
})
export class DetailsComponent implements OnInit {
  id: string | null = null;
  decodedId: string | null = null;

  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.decodedId = decodeURIComponent(this.id);
    }
  }
}
