import { Component, computed } from '@angular/core';
import { BaseWidget } from '../base-widget';

export interface PostalAddress {
  type?: string;
  streetAddress?: string;
  postalCode?: string;
  addressLocality?: string;
  addressRegion?: string;
  addressCountry?: string;
}

@Component({
  selector: 'app-address-widget',

  imports: [],
  templateUrl: './address-widget.component.html',
})
export class AddressWidget extends BaseWidget {
  addresses = computed<PostalAddress[]>(() => {
    return this.values() as PostalAddress[];
  });

  formatPostalInfo(address: PostalAddress): string {
    const parts = [];
    if (address.postalCode) {
      parts.push(address.postalCode);
    }
    if (address.addressLocality) {
      parts.push(address.addressLocality);
    }
    return parts.join(' ');
  }

  formatRegionInfo(address: PostalAddress): string {
    const parts = [];
    if (address.addressRegion) {
      parts.push(address.addressRegion);
    }
    if (address.addressCountry) {
      parts.push(address.addressCountry);
    }
    return parts.join(', ');
  }
}
