import { Component, input } from '@angular/core';

@Component({
  selector: 'app-results-count',
  imports: [],
  templateUrl: './results-count.html',
})
export class ResultsCount {
  totalResults = input.required<number>();
  showingResults = input.required<number>();
}
