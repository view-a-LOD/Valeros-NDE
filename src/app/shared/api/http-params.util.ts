import { HttpParams } from '@angular/common/http';

export function buildHttpParams(query: object): HttpParams {
  let params = new HttpParams();

  const addParam = (key: string, value?: string | number | boolean) => {
    if (value !== undefined && value !== null && value !== '') {
      params = params.set(key, value.toString());
    }
  };

  const addArrayParam = (key: string, values?: string[]) => {
    if (values?.length) {
      values.forEach((value) => {
        params = params.append(key, value);
      });
    }
  };

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      addArrayParam(key, value as string[]);
    } else {
      addParam(key, value as string | number | boolean);
    }
  });

  return params;
}
