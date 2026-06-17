import { http, HttpResponse } from 'msw';
import type {
  CreateDivisionRequestDto,
  UpdateDivisionRequestDto,
} from '@/modules/divisions/api/dto';
import type { CreateCourseRequestDto, UpdateCourseRequestDto } from '@/modules/products/courses/api/dto';
import type { CreateAccommodationRequestDto, UpdateAccommodationRequestDto } from '@/modules/products/accommodations/api/dto';
import type { CreateRoomRequestDto, UpdateRoomRequestDto } from '@/modules/products/rooms/api/dto';
import type { CreateAddOnRequestDto, UpdateAddOnRequestDto } from '@/modules/products/addons/api/dto';
import type { CreateTransferRequestDto, UpdateTransferRequestDto } from '@/modules/products/transfers/api/dto';
import type { CreatePackageRequestDto, UpdatePackageRequestDto } from '@/modules/products/packages/api/dto';
import { divisionFixtures } from './data/divisions';
import { referenceDataFixtures } from './data/reference-data';
import {
  courseFixtures,
  accommodationFixtures,
  roomFixtures,
  addonFixtures,
  transferFixtures,
  packageFixtures,
} from './data/products';

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

  http.get('/api/v1/reference-data/course-languages', () =>
    HttpResponse.json(referenceDataFixtures.getCourseLanguages()),
  ),

  http.get('/api/v1/reference-data/course-intensities', () =>
    HttpResponse.json(referenceDataFixtures.getCourseIntensities()),
  ),

  http.get('/api/v1/reference-data/unit-types', () =>
    HttpResponse.json(referenceDataFixtures.getUnitTypes()),
  ),

  http.get('/api/v1/divisions/:divisionId/account-categories', () =>
    HttpResponse.json(referenceDataFixtures.getAccountCategories()),
  ),

  http.get('/api/v1/divisions/:divisionId/product-categories', () =>
    HttpResponse.json(referenceDataFixtures.getProductCategories()),
  ),

  http.get('/api/v1/reference-data/accommodation-types', () =>
    HttpResponse.json(referenceDataFixtures.getAccommodationTypes()),
  ),

  http.get('/api/v1/reference-data/accommodation-room-types', () =>
    HttpResponse.json(referenceDataFixtures.getAccommodationRoomTypes()),
  ),

  http.get('/api/v1/reference-data/accommodation-bathroom-types', () =>
    HttpResponse.json(referenceDataFixtures.getAccommodationBathroomTypes()),
  ),

  http.get('/api/v1/reference-data/accommodation-board-types', () =>
    HttpResponse.json(referenceDataFixtures.getAccommodationBoardTypes()),
  ),

  http.get('/api/v1/reference-data/accommodation-room-grades', () =>
    HttpResponse.json(referenceDataFixtures.getAccommodationRoomGrades()),
  ),

  http.get('/api/v1/reference-data/transfer-types', () =>
    HttpResponse.json(referenceDataFixtures.getTransferTypes()),
  ),

  http.get('/api/v1/reference-data/transfer-ports', () =>
    HttpResponse.json(referenceDataFixtures.getTransferPorts()),
  ),

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

  // ─── Courses ────────────────────────────────────────────────────────────────
  http.get('/api/v1/divisions/:divisionId/courses', ({ request }) => {
    const url = new URL(request.url);
    return HttpResponse.json(courseFixtures.getList({
      search: url.searchParams.get('search') ?? undefined,
      page: getNumericSearchParam(url, 'page'),
      pageSize: getNumericSearchParam(url, 'pageSize'),
    }));
  }),
  http.get('/api/v1/courses/:id', ({ params }) => {
    const item = courseFixtures.getById(Number(params.id));
    return item ? HttpResponse.json(item) : HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),
  http.post('/api/v1/divisions/:divisionId/courses', async ({ request }) => {
    const payload = (await request.json()) as CreateCourseRequestDto;
    const created = courseFixtures.create(payload);
    return HttpResponse.json({ id: created.id }, { status: 201 });
  }),
  http.put('/api/v1/courses/:id', async ({ params, request }) => {
    const payload = (await request.json()) as UpdateCourseRequestDto;
    const updated = courseFixtures.update(Number(params.id), payload);
    return updated ? new HttpResponse(null, { status: 204 }) : HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),

  // ─── Accommodations ──────────────────────────────────────────────────────────
  http.get('/api/v1/accommodations', ({ request }) => {
    const url = new URL(request.url);
    return HttpResponse.json(accommodationFixtures.getList({
      search: url.searchParams.get('search') ?? undefined,
      page: getNumericSearchParam(url, 'page'),
      pageSize: getNumericSearchParam(url, 'pageSize'),
    }));
  }),
  http.get('/api/v1/accommodations/:id', ({ params }) => {
    const item = accommodationFixtures.getById(Number(params.id));
    return item ? HttpResponse.json(item) : HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),
  http.post('/api/v1/accommodations', async ({ request }) => {
    const payload = (await request.json()) as CreateAccommodationRequestDto;
    const created = accommodationFixtures.create(payload);
    return HttpResponse.json({ id: created.id }, { status: 201 });
  }),
  http.put('/api/v1/accommodations/:id', async ({ params, request }) => {
    const payload = (await request.json()) as UpdateAccommodationRequestDto;
    const updated = accommodationFixtures.update(Number(params.id), payload);
    return updated ? new HttpResponse(null, { status: 204 }) : HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),

  // ─── Rooms ───────────────────────────────────────────────────────────────────
  http.get('/api/v1/divisions/:divisionId/accommodations/:accommodationId/rooms', ({ params, request }) => {
    const url = new URL(request.url);
    return HttpResponse.json(roomFixtures.getList({
      accommodationId: Number(params.accommodationId),
      search: url.searchParams.get('search') ?? undefined,
      page: getNumericSearchParam(url, 'page'),
      pageSize: getNumericSearchParam(url, 'pageSize'),
    }));
  }),
  http.get('/api/v1/accommodation-rooms/:id', ({ params }) => {
    const item = roomFixtures.getById(Number(params.id));
    return item ? HttpResponse.json(item) : HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),
  http.post('/api/v1/divisions/:divisionId/accommodations/:accommodationId/rooms', async ({ params, request }) => {
    const payload = (await request.json()) as CreateRoomRequestDto;
    const created = roomFixtures.create(payload, Number(params.accommodationId), Number(params.divisionId));
    return HttpResponse.json({ id: created.id }, { status: 201 });
  }),
  http.put('/api/v1/accommodation-rooms/:id', async ({ params, request }) => {
    const payload = (await request.json()) as UpdateRoomRequestDto;
    const updated = roomFixtures.update(Number(params.id), payload);
    return updated ? new HttpResponse(null, { status: 204 }) : HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),

  // ─── Add-ons ─────────────────────────────────────────────────────────────────
  http.get('/api/v1/divisions/:divisionId/add-ons', ({ request }) => {
    const url = new URL(request.url);
    return HttpResponse.json(addonFixtures.getList({
      search: url.searchParams.get('search') ?? undefined,
      page: getNumericSearchParam(url, 'page'),
      pageSize: getNumericSearchParam(url, 'pageSize'),
    }));
  }),
  http.get('/api/v1/add-ons/:id', ({ params }) => {
    const item = addonFixtures.getById(Number(params.id));
    return item ? HttpResponse.json(item) : HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),
  http.post('/api/v1/divisions/:divisionId/add-ons', async ({ params, request }) => {
    const payload = (await request.json()) as CreateAddOnRequestDto;
    const created = addonFixtures.create(Number(params.divisionId), payload);
    return HttpResponse.json({ id: created.id }, { status: 201 });
  }),
  http.put('/api/v1/add-ons/:id', async ({ params, request }) => {
    const payload = (await request.json()) as UpdateAddOnRequestDto;
    const updated = addonFixtures.update(Number(params.id), payload);
    return updated ? new HttpResponse(null, { status: 204 }) : HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),

  // ─── Transfers ───────────────────────────────────────────────────────────────
  http.get('/api/v1/divisions/:divisionId/transfers', ({ request }) => {
    const url = new URL(request.url);
    return HttpResponse.json(transferFixtures.getList({
      search: url.searchParams.get('search') ?? undefined,
      page: getNumericSearchParam(url, 'page'),
      pageSize: getNumericSearchParam(url, 'pageSize'),
    }));
  }),
  http.get('/api/v1/transfers/:id', ({ params }) => {
    const item = transferFixtures.getById(Number(params.id));
    return item ? HttpResponse.json(item) : HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),
  http.post('/api/v1/divisions/:divisionId/transfers', async ({ params, request }) => {
    const payload = (await request.json()) as CreateTransferRequestDto;
    const created = transferFixtures.create(Number(params.divisionId), payload);
    return HttpResponse.json({ id: created.id }, { status: 201 });
  }),
  http.put('/api/v1/transfers/:id', async ({ params, request }) => {
    const payload = (await request.json()) as UpdateTransferRequestDto;
    const updated = transferFixtures.update(Number(params.id), payload);
    return updated ? new HttpResponse(null, { status: 204 }) : HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),

  // ─── Packages ────────────────────────────────────────────────────────────────
  http.get('/api/v1/divisions/:divisionId/packages', ({ request }) => {
    const url = new URL(request.url);
    return HttpResponse.json(packageFixtures.getList({
      search: url.searchParams.get('search') ?? undefined,
      page: getNumericSearchParam(url, 'page'),
      pageSize: getNumericSearchParam(url, 'pageSize'),
    }));
  }),
  http.get('/api/v1/packages/:id', ({ params }) => {
    const item = packageFixtures.getById(Number(params.id));
    return item ? HttpResponse.json(item) : HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),
  http.post('/api/v1/divisions/:divisionId/packages', async ({ params, request }) => {
    const payload = (await request.json()) as CreatePackageRequestDto;
    const created = packageFixtures.create(Number(params.divisionId), payload);
    return HttpResponse.json({ id: created.id }, { status: 201 });
  }),
  http.put('/api/v1/packages/:id', async ({ params, request }) => {
    const payload = (await request.json()) as UpdatePackageRequestDto;
    const updated = packageFixtures.update(Number(params.id), payload);
    return updated ? new HttpResponse(null, { status: 204 }) : HttpResponse.json({ message: 'Not found' }, { status: 404 });
  }),
];
