import { http, HttpResponse } from 'msw';
import type {
  CreateDivisionRequestDto,
  UpdateDivisionRequestDto,
} from '@/modules/divisions/api/dto';
import { divisionFixtures } from './data/divisions';
import { referenceDataFixtures } from './data/reference-data';

function getNumericSearchParam(url: URL, key: string): number | undefined {
  const value = Number(url.searchParams.get(key));
  return Number.isFinite(value) && value > 0 ? value : undefined;
}

export const handlers = [
  http.get('/api/v1/reference-data/countries', () =>
    HttpResponse.json(referenceDataFixtures.getCountries()),
  ),

  http.get('/api/v1/reference-data/currencies', () =>
    HttpResponse.json(referenceDataFixtures.getCurrencies()),
  ),

  http.get('/api/v1/reference-data/audiences', () =>
    HttpResponse.json(referenceDataFixtures.getAudiences()),
  ),

  http.get('/api/v1/reference-data/content-templates', ({ request }) => {
    const url = new URL(request.url);
    const scope = getNumericSearchParam(url, 'scope');

    return HttpResponse.json(referenceDataFixtures.getContentTemplates(scope));
  }),

  http.get('/api/v1/divisions', ({ request }) => {
    const url = new URL(request.url);

    return HttpResponse.json(
      divisionFixtures.getList({
        search: url.searchParams.get('search') ?? undefined,
        page: getNumericSearchParam(url, 'page'),
        pageSize: getNumericSearchParam(url, 'pageSize'),
      }),
    );
  }),

  http.get('/api/v1/divisions/:divisionId', ({ params }) => {
    const divisionId = Number(params.divisionId);
    const division = divisionFixtures.getById(divisionId);

    if (!division) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return HttpResponse.json(division);
  }),

  http.post('/api/v1/divisions', async ({ request }) => {
    const payload = (await request.json()) as CreateDivisionRequestDto;
    const created = divisionFixtures.create(payload);
    return HttpResponse.json({ id: created.id }, { status: 201 });
  }),

  http.put('/api/v1/divisions/:divisionId', async ({ params, request }) => {
    const divisionId = Number(params.divisionId);
    const payload = (await request.json()) as UpdateDivisionRequestDto;
    const updated = divisionFixtures.update(divisionId, payload);

    if (!updated) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return new HttpResponse(null, { status: 204 });
  }),
];
