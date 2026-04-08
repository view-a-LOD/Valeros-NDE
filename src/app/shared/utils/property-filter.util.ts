import { WidgetsSettings } from '../types/widget-config';

export function getVisibleProperties(
  properties: string[],
  settings: WidgetsSettings,
): string[] {
  const { includedProperties, hiddenProperties } = settings;

  if (includedProperties && hiddenProperties) {
    return properties.filter(
      (prop) =>
        includedProperties.includes(prop) && !hiddenProperties.includes(prop),
    );
  } else if (includedProperties) {
    return properties.filter((prop) => includedProperties.includes(prop));
  } else if (hiddenProperties) {
    return properties.filter((prop) => !hiddenProperties.includes(prop));
  }

  return properties;
}

export function sortProperties(
  properties: string[],
  propertyOrder?: string[],
): string[] {
  return properties.sort((a, b) => {
    const indexA = propertyOrder?.indexOf(a) ?? -1;
    const indexB = propertyOrder?.indexOf(b) ?? -1;

    const orderIsDefinedForA = indexA !== -1;
    const orderIsDefinedForB = indexB !== -1;

    if (orderIsDefinedForA && orderIsDefinedForB) return indexA - indexB;
    if (orderIsDefinedForA) return -1;
    if (orderIsDefinedForB) return 1;
    if (!orderIsDefinedForA && !orderIsDefinedForB) return a.localeCompare(b);

    return 0;
  });
}
