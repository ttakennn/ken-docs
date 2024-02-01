import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [CommonModule, MatButton],
  selector: 'app-defer-basic',
  template: `
    <h3>Example 1 - Visible</h3>

    @defer (when isVisible) {
      <h4>Basic defer</h4>
      <div>{{ 'foo' }}</div>
    } @loading {
      <div>loading...</div>
    } @placeholder {
      <div>placeholder...</div>
    } @error {
      <div>Failed something...</div>
    }

    <button mat-raised-button color="primary" (click)="isVisible = true">Load</button>

    <hr />
    <h3>Example 2 - Trigger</h3>
    @defer (on interaction(trigger)) {
      <h4>Basic defer</h4>
      <div>{{ 'baa' }}</div>
    } @placeholder {
      <div>placeholder...</div>
    }

    <button #trigger mat-raised-button color="primary">Trigger</button>

    <hr />
    <h3>Example 3 - Prefetching</h3>
    @defer (when isVisible; prefetch when prefetchCondition) {
      <h4>Basic defer</h4>
    } @placeholder {
      <div>Placeholder</div>
    }

    <button mat-raised-button color="primary" (click)="prefetchCondition = true">
      Trigger PrefetchCondition
    </button>

    <hr />
    <h3>Example 4 - Prefetching on immediate</h3>
    @defer (when isVisible; prefetch on immediate) {
      <h4>Basic defer</h4>
    } @placeholder {
      <div>Placeholder</div>
    }

    <hr />
    <h3>Example 5 - Incorporating</h3>
    @if (step === 0) {
      <div>Step 1</div>
      <button mat-raised-button color="warn" (click)="updateStep(1)">Next</button>
    }

    @defer (prefetch on idle) {
      @if (step === 1) {
        <div>Step 2</div>
        <button mat-raised-button color="warn" (click)="updateStep(2)">Next</button>
      }
    }

    @defer (prefetch on idle) {
      @if (step === 2) {
        <div>Step 3</div>
      }
    }

    <hr />
    <h3>Example 6 - Viewport</h3>
    @defer (on viewport(viewportTrigger)) {
      <h4>Basic defer</h4>
      <div>{{ 'viewport' }}</div>
    } @placeholder {
      <div>placeholder...</div>
    }

    <button style="margin-top: 500px" #viewportTrigger mat-raised-button color="primary">
      Viewport Trigger
    </button>
  `,
})
export class DeferBasicComponent implements OnInit {
  isVisible = false;
  prefetchCondition = false;
  step = 0;

  updateStep(step: number) {
    this.step = step;
  }

  constructor() {}

  ngOnInit() {}
}
