import { Component, AfterViewInit, OnDestroy, computed } from '@angular/core';
import { BaseWidget } from '../base-widget';
import Mirador, { MiradorInstance, MiradorConfig } from 'mirador';
import { SearchValueObject } from '@valeros-ldkit/shared-types';

// TODO: Define this type elsewhere
type AssociatedMediaObject = SearchValueObject & {
  '@id'?: string;
  contentUrl?: string;
  thumbnailUrl?: string;
  encodingFormat?: string;
};

@Component({
  selector: 'app-iiif-widget',
  standalone: true,
  imports: [],
  templateUrl: './iiif-widget.component.html',
})
export class IiifWidget extends BaseWidget implements AfterViewInit, OnDestroy {
  private miradorInstances: Map<string, MiradorInstance> = new Map();
  readonly instanceId = crypto.randomUUID();

  manifestUrls = computed(() => {
    return (this.values() as AssociatedMediaObject[])
      .filter((v) => this.isIIIFManifest(v))
      .map((v) => v['@id'])
      .filter((url): url is string => typeof url === 'string' && url !== '');
  });

  ngAfterViewInit(): void {
    this.manifestUrls().forEach((manifestUrl, index) => {
      const elementId = this.getMiradorElementId(index);
      this.initializeMirador(manifestUrl, elementId);
    });
  }

  ngOnDestroy(): void {
    this.miradorInstances.forEach((instance: MiradorInstance) => {
      instance.unmount();
    });
    this.miradorInstances.clear();
  }

  private initializeMirador(manifestUrl: string, elementId: string): void {
    const element = document.getElementById(elementId);
    if (!element) {
      return;
    }

    const config: MiradorConfig = {
      id: elementId,
      windows: [
        {
          manifestId: manifestUrl,
          thumbnailNavigationPosition: 'far-right',
          thumbnailNavigationVisible: true,
        },
      ],
      window: {
        allowClose: false,
        allowMaximize: true,
        sideBarOpenByDefault: false,
      },
      workspace: {
        showZoomControls: true,
      },
      workspaceControlPanel: {
        enabled: false,
      },
    };

    const instance = Mirador.viewer(config);

    this.miradorInstances.set(elementId, instance);
  }

  private isIIIFManifest(valueObj: AssociatedMediaObject): boolean {
    // TODO: Find more robust way to check if the MediaObject value is a IIIF manifest or not
    const encodingFormat: string | undefined = valueObj.encodingFormat;
    const isIIIFManifest =
      typeof encodingFormat === 'string' &&
      encodingFormat.includes('iiif.io/api/presentation');
    return isIIIFManifest;
  }

  getMiradorElementId(index: number): string {
    return `mirador-${this.instanceId}-${index}`;
  }
}
