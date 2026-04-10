import { http, HttpResponse } from 'msw';
import type { DivisionUpsertDto } from '@/modules/divisions/api/dto';
import { divisionFixtures } from './data/divisions';

export const handlers = [
  http.get('/api/divisions', () => HttpResponse.json(divisionFixtures.getList())),

  http.get('/api/divisions/:divisionId', ({ params }) => {
    const divisionId = Number(params.divisionId);
    const division = divisionFixtures.getById(divisionId);

    if (!division) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return HttpResponse.json(division);
  }),

  http.put('/api/divisions/create', async ({ request }) => {
    const payload = (await request.json()) as DivisionUpsertDto;
    divisionFixtures.create(payload);
    return HttpResponse.json({});
  }),

  http.put('/api/divisions/:divisionId', async ({ params, request }) => {
    const divisionId = Number(params.divisionId);
    const payload = (await request.json()) as DivisionUpsertDto;
    const updated = divisionFixtures.update(divisionId, payload);

    if (!updated) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    }

    return HttpResponse.json({});
  }),
];
