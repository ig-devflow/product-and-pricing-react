import type {
  CourseDetailsDto,
  CourseListItemDto,
  CreateCourseRequestDto,
  UpdateCourseRequestDto,
} from '@/modules/products/courses/api/dto';
import type {
  AccommodationDetailsDto,
  AccommodationListItemDto,
  CreateAccommodationRequestDto,
  UpdateAccommodationRequestDto,
} from '@/modules/products/accommodations/api/dto';
import type {
  RoomDetailsDto,
  RoomListItemDto,
  CreateRoomRequestDto,
  UpdateRoomRequestDto,
} from '@/modules/products/rooms/api/dto';
import type {
  AddOnDetailsDto,
  AddOnListItemDto,
  CreateAddOnRequestDto,
  UpdateAddOnRequestDto,
} from '@/modules/products/addons/api/dto';
import type {
  TransferDetailsDto,
  TransferListItemDto,
  CreateTransferRequestDto,
  UpdateTransferRequestDto,
} from '@/modules/products/transfers/api/dto';
import type {
  PackageDetailsDto,
  PackageListItemDto,
  CreatePackageRequestDto,
  UpdatePackageRequestDto,
} from '@/modules/products/packages/api/dto';

const versionToken = 'AAAAAAAAB9E=';
const createdAt = '2026-05-10T14:08:00Z';
const updatedAt = '2026-05-15T10:30:00Z';
const createdByName = 'System User';
const updatedByName = 'System User';

function pagedResult<T>(items: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    totalCount: items.length,
    page,
    pageSize,
  };
}

function filterBySearch<T extends { name: string }>(items: T[], search: string): T[] {
  if (!search) return items;
  const q = search.toLowerCase();
  return items.filter((i) => i.name.toLowerCase().includes(q));
}

// ─── Courses ────────────────────────────────────────────────────────────────

const initialCourseDetails = new Map<number, CourseDetailsDto>([
  [
    1,
    {
      id: 1,
      name: 'General English',
      isActive: true,
      divisionId: 1,
      unitTypeId: 1,
      courseLanguageId: 1,
      courseIntensityId: 1,
      ageFrom: 16,
      ageTo: 99,
      minimumWeeks: 1,
      accountCategoryId: 1,
      productCategoryId: 1,
      generalLedgerCode: '4001-GE',
      costCentreCode: 'CC-ADL',
      closurePolicy: null,
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt,
      updatedByName,
    },
  ],
  [
    2,
    {
      id: 2,
      name: 'Intensive English',
      isActive: true,
      divisionId: 1,
      unitTypeId: 1,
      courseLanguageId: 1,
      courseIntensityId: 2,
      ageFrom: 18,
      ageTo: 99,
      minimumWeeks: 2,
      accountCategoryId: 1,
      productCategoryId: 1,
      generalLedgerCode: '4002-IE',
      costCentreCode: 'CC-ADL',
      closurePolicy: null,
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt,
      updatedByName,
    },
  ],
  [
    3,
    {
      id: 3,
      name: 'Junior English',
      isActive: false,
      divisionId: 1,
      unitTypeId: 1,
      courseLanguageId: 1,
      courseIntensityId: 1,
      ageFrom: 12,
      ageTo: 17,
      minimumWeeks: 1,
      accountCategoryId: 3,
      productCategoryId: 3,
      generalLedgerCode: null,
      costCentreCode: null,
      closurePolicy: null,
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt: '',
      updatedByName: '',
    },
  ],
]);

let courseList: CourseListItemDto[] = Array.from(initialCourseDetails.values()).map((d) => ({
  id: d.id,
  name: d.name,
  isActive: d.isActive,
  divisionName: 'EC Adult · ADL',
  courseLanguageId: d.courseLanguageId,
  courseIntensityId: d.courseIntensityId,
  createdAt: d.createdAt,
  createdByName: d.createdByName,
  updatedAt: d.updatedAt,
  updatedByName: d.updatedByName,
}));

let courseDetails = new Map(initialCourseDetails);

export const courseFixtures = {
  getList: (params: { search?: string; page?: number; pageSize?: number } = {}) => {
    const filtered = filterBySearch(courseList, params.search ?? '');
    return pagedResult(filtered, params.page ?? 1, params.pageSize ?? 4);
  },
  getById: (id: number) => courseDetails.get(id) ?? null,
  create: (payload: CreateCourseRequestDto) => {
    const id = Math.max(0, ...courseList.map((c) => c.id)) + 1;
    const detail: CourseDetailsDto = {
      ...payload,
      id,
      divisionId: 1,
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt: '',
      updatedByName: '',
    };
    courseDetails.set(id, detail);
    courseList = [
      {
        id,
        name: payload.name,
        isActive: payload.isActive,
        divisionName: 'EC Adult · ADL',
        courseLanguageId: payload.courseLanguageId,
        courseIntensityId: payload.courseIntensityId,
        createdAt,
        createdByName,
        updatedAt: '',
        updatedByName: '',
      },
      ...courseList,
    ];
    return detail;
  },
  update: (id: number, payload: UpdateCourseRequestDto) => {
    const existing = courseDetails.get(id);
    if (!existing) return null;
    const updated: CourseDetailsDto = { ...existing, ...payload, id, updatedAt, updatedByName };
    courseDetails.set(id, updated);
    courseList = courseList.map((c) =>
      c.id === id
        ? { ...c, name: payload.name, isActive: payload.isActive, courseLanguageId: payload.courseLanguageId, courseIntensityId: payload.courseIntensityId, updatedAt, updatedByName }
        : c,
    );
    return updated;
  },
};

// ─── Accommodations ──────────────────────────────────────────────────────────

const initialAccommodationDetails = new Map<number, AccommodationDetailsDto>([
  [
    1,
    {
      id: 1,
      name: 'Residence Malta',
      isActive: true,
      description: 'On-site student residence in Valletta.',
      roomCount: 2,
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt,
      updatedByName,
    },
  ],
  [
    2,
    {
      id: 2,
      name: 'Host Family',
      isActive: true,
      description: 'Stay with a local family for an immersive experience.',
      roomCount: 1,
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt,
      updatedByName,
    },
  ],
]);

let accommodationList: AccommodationListItemDto[] = Array.from(
  initialAccommodationDetails.values(),
).map((d) => ({
  id: d.id,
  name: d.name,
  isActive: d.isActive,
  roomCount: d.roomCount,
  createdAt: d.createdAt,
  createdByName: d.createdByName,
  updatedAt: d.updatedAt,
  updatedByName: d.updatedByName,
}));

let accommodationDetails = new Map(initialAccommodationDetails);

export const accommodationFixtures = {
  getList: (params: { search?: string; page?: number; pageSize?: number } = {}) => {
    const filtered = filterBySearch(accommodationList, params.search ?? '');
    return pagedResult(filtered, params.page ?? 1, params.pageSize ?? 4);
  },
  getById: (id: number) => accommodationDetails.get(id) ?? null,
  create: (payload: CreateAccommodationRequestDto) => {
    const id = Math.max(0, ...accommodationList.map((a) => a.id)) + 1;
    const detail: AccommodationDetailsDto = {
      ...payload,
      id,
      description: payload.description ?? '',
      roomCount: 0,
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt: '',
      updatedByName: '',
    };
    accommodationDetails.set(id, detail);
    accommodationList = [{ id, name: payload.name, isActive: payload.isActive, roomCount: 0, createdAt, createdByName, updatedAt: '', updatedByName: '' }, ...accommodationList];
    return detail;
  },
  update: (id: number, payload: UpdateAccommodationRequestDto) => {
    const existing = accommodationDetails.get(id);
    if (!existing) return null;
    const updated: AccommodationDetailsDto = { ...existing, ...payload, id, updatedAt, updatedByName };
    accommodationDetails.set(id, updated);
    accommodationList = accommodationList.map((a) =>
      a.id === id ? { ...a, name: payload.name, isActive: payload.isActive, updatedAt, updatedByName } : a,
    );
    return updated;
  },
};

// ─── Rooms ───────────────────────────────────────────────────────────────────

const initialRoomDetails = new Map<number, RoomDetailsDto>([
  [
    1,
    {
      id: 1,
      name: 'Single Standard',
      isActive: true,
      accommodationId: 1,
      accommodationName: 'Residence Malta',
      divisionId: 7,
      divisionName: 'EC Malta',
      maxOccupancy: 1,
      description: 'A standard single room in the residence.',
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt,
      updatedByName,
    },
  ],
  [
    2,
    {
      id: 2,
      name: 'Twin Shared',
      isActive: true,
      accommodationId: 1,
      accommodationName: 'Residence Malta',
      divisionId: 7,
      divisionName: 'EC Malta',
      maxOccupancy: 2,
      description: 'A twin room shared with another student.',
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt,
      updatedByName,
    },
  ],
  [
    3,
    {
      id: 3,
      name: 'Host Room',
      isActive: true,
      accommodationId: 2,
      accommodationName: 'Host Family',
      divisionId: 7,
      divisionName: 'EC Malta',
      maxOccupancy: 1,
      description: 'Private room in a host family home.',
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt,
      updatedByName,
    },
  ],
]);

let roomList: RoomListItemDto[] = Array.from(initialRoomDetails.values()).map((d) => ({
  id: d.id,
  name: d.name,
  isActive: d.isActive,
  accommodationId: d.accommodationId,
  accommodationName: d.accommodationName,
  divisionId: d.divisionId,
  divisionName: d.divisionName,
  maxOccupancy: d.maxOccupancy,
  createdAt: d.createdAt,
  createdByName: d.createdByName,
  updatedAt: d.updatedAt,
  updatedByName: d.updatedByName,
}));

let roomDetails = new Map(initialRoomDetails);

export const roomFixtures = {
  getList: (params: { accommodationId?: number; search?: string; page?: number; pageSize?: number } = {}) => {
    let items = roomList;
    if (params.accommodationId) {
      items = items.filter((r) => r.accommodationId === params.accommodationId);
    }
    const filtered = filterBySearch(items, params.search ?? '');
    return pagedResult(filtered, params.page ?? 1, params.pageSize ?? 4);
  },
  getById: (id: number) => roomDetails.get(id) ?? null,
  create: (payload: CreateRoomRequestDto) => {
    const id = Math.max(0, ...roomList.map((r) => r.id)) + 1;
    const accName = accommodationFixtures.getById(payload.accommodationId)?.name ?? '';
    const detail: RoomDetailsDto = {
      ...payload,
      id,
      accommodationName: accName,
      divisionName: 'EC Malta',
      description: payload.description ?? '',
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt: '',
      updatedByName: '',
    };
    roomDetails.set(id, detail);
    roomList = [{ id, name: payload.name, isActive: payload.isActive, accommodationId: payload.accommodationId, accommodationName: accName, divisionId: payload.divisionId, divisionName: 'EC Malta', maxOccupancy: payload.maxOccupancy, createdAt, createdByName, updatedAt: '', updatedByName: '' }, ...roomList];
    return detail;
  },
  update: (id: number, payload: UpdateRoomRequestDto) => {
    const existing = roomDetails.get(id);
    if (!existing) return null;
    const updated: RoomDetailsDto = { ...existing, ...payload, id, accommodationName: existing.accommodationName, divisionName: existing.divisionName, updatedAt, updatedByName };
    roomDetails.set(id, updated);
    roomList = roomList.map((r) =>
      r.id === id ? { ...r, name: payload.name, isActive: payload.isActive, maxOccupancy: payload.maxOccupancy, updatedAt, updatedByName } : r,
    );
    return updated;
  },
};

// ─── Add-ons ─────────────────────────────────────────────────────────────────

const initialAddonDetails = new Map<number, AddOnDetailsDto>([
  [
    1,
    {
      id: 1,
      name: 'Airport Pickup',
      isActive: true,
      divisionId: 7,
      divisionName: 'EC Malta',
      description: 'Private driver pickup from Malta International Airport.',
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt,
      updatedByName,
    },
  ],
  [
    2,
    {
      id: 2,
      name: 'Meals Package',
      isActive: true,
      divisionId: 7,
      divisionName: 'EC Malta',
      description: 'Full board meal package at the school cafeteria.',
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt,
      updatedByName,
    },
  ],
]);

let addonList: AddOnListItemDto[] = Array.from(initialAddonDetails.values()).map((d) => ({
  id: d.id,
  name: d.name,
  isActive: d.isActive,
  divisionId: d.divisionId,
  divisionName: d.divisionName,
  createdAt: d.createdAt,
  createdByName: d.createdByName,
  updatedAt: d.updatedAt,
  updatedByName: d.updatedByName,
}));

let addonDetails = new Map(initialAddonDetails);

export const addonFixtures = {
  getList: (params: { search?: string; page?: number; pageSize?: number } = {}) => {
    const filtered = filterBySearch(addonList, params.search ?? '');
    return pagedResult(filtered, params.page ?? 1, params.pageSize ?? 4);
  },
  getById: (id: number) => addonDetails.get(id) ?? null,
  getAll: () => addonList,
  create: (payload: CreateAddOnRequestDto) => {
    const id = Math.max(0, ...addonList.map((a) => a.id)) + 1;
    const detail: AddOnDetailsDto = { ...payload, id, divisionName: 'EC Malta', description: payload.description ?? '', version: versionToken, createdAt, createdByName, updatedAt: '', updatedByName: '' };
    addonDetails.set(id, detail);
    addonList = [{ id, name: payload.name, isActive: payload.isActive, divisionId: payload.divisionId, divisionName: 'EC Malta', createdAt, createdByName, updatedAt: '', updatedByName: '' }, ...addonList];
    return detail;
  },
  update: (id: number, payload: UpdateAddOnRequestDto) => {
    const existing = addonDetails.get(id);
    if (!existing) return null;
    const updated: AddOnDetailsDto = { ...existing, ...payload, id, divisionName: existing.divisionName, updatedAt, updatedByName };
    addonDetails.set(id, updated);
    addonList = addonList.map((a) => a.id === id ? { ...a, name: payload.name, isActive: payload.isActive, updatedAt, updatedByName } : a);
    return updated;
  },
};

// ─── Transfers ───────────────────────────────────────────────────────────────

const initialTransferDetails = new Map<number, TransferDetailsDto>([
  [
    1,
    {
      id: 1,
      name: 'Standard Airport Transfer',
      isActive: true,
      divisionId: 7,
      divisionName: 'EC Malta',
      description: 'Shared shuttle service between airport and school.',
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt,
      updatedByName,
    },
  ],
  [
    2,
    {
      id: 2,
      name: 'Private Airport Transfer',
      isActive: true,
      divisionId: 7,
      divisionName: 'EC Malta',
      description: 'Private car service for individual travellers.',
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt,
      updatedByName,
    },
  ],
]);

let transferList: TransferListItemDto[] = Array.from(initialTransferDetails.values()).map((d) => ({
  id: d.id,
  name: d.name,
  isActive: d.isActive,
  divisionId: d.divisionId,
  divisionName: d.divisionName,
  createdAt: d.createdAt,
  createdByName: d.createdByName,
  updatedAt: d.updatedAt,
  updatedByName: d.updatedByName,
}));

let transferDetails = new Map(initialTransferDetails);

export const transferFixtures = {
  getList: (params: { search?: string; page?: number; pageSize?: number } = {}) => {
    const filtered = filterBySearch(transferList, params.search ?? '');
    return pagedResult(filtered, params.page ?? 1, params.pageSize ?? 4);
  },
  getById: (id: number) => transferDetails.get(id) ?? null,
  getAll: () => transferList,
  create: (payload: CreateTransferRequestDto) => {
    const id = Math.max(0, ...transferList.map((t) => t.id)) + 1;
    const detail: TransferDetailsDto = { ...payload, id, divisionName: 'EC Malta', description: payload.description ?? '', version: versionToken, createdAt, createdByName, updatedAt: '', updatedByName: '' };
    transferDetails.set(id, detail);
    transferList = [{ id, name: payload.name, isActive: payload.isActive, divisionId: payload.divisionId, divisionName: 'EC Malta', createdAt, createdByName, updatedAt: '', updatedByName: '' }, ...transferList];
    return detail;
  },
  update: (id: number, payload: UpdateTransferRequestDto) => {
    const existing = transferDetails.get(id);
    if (!existing) return null;
    const updated: TransferDetailsDto = { ...existing, ...payload, id, divisionName: existing.divisionName, updatedAt, updatedByName };
    transferDetails.set(id, updated);
    transferList = transferList.map((t) => t.id === id ? { ...t, name: payload.name, isActive: payload.isActive, updatedAt, updatedByName } : t);
    return updated;
  },
};

// ─── Packages ────────────────────────────────────────────────────────────────

const initialPackageDetails = new Map<number, PackageDetailsDto>([
  [
    1,
    {
      id: 1,
      name: 'Standard Package',
      isActive: true,
      divisionId: 7,
      divisionName: 'EC Malta',
      description: 'General English + Residence + Standard Transfer.',
      components: {
        courseId: 1,
        courseName: 'General English',
        accommodationId: 1,
        accommodationName: 'Residence Malta',
        roomId: 1,
        roomName: 'Single Standard',
        addonIds: [],
        addonNames: [],
        transferIds: [1],
        transferNames: ['Standard Airport Transfer'],
      },
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt,
      updatedByName,
    },
  ],
]);

let packageList: PackageListItemDto[] = Array.from(initialPackageDetails.values()).map((d) => ({
  id: d.id,
  name: d.name,
  isActive: d.isActive,
  divisionId: d.divisionId,
  divisionName: d.divisionName,
  componentCount:
    (d.components.courseId ? 1 : 0) +
    (d.components.accommodationId ? 1 : 0) +
    d.components.addonIds.length +
    d.components.transferIds.length,
  createdAt: d.createdAt,
  createdByName: d.createdByName,
  updatedAt: d.updatedAt,
  updatedByName: d.updatedByName,
}));

let packageDetails = new Map(initialPackageDetails);

function resolvePackageComponent(payload: CreatePackageRequestDto) {
  const courseName = payload.courseId
    ? (courseFixtures.getById(payload.courseId)?.name ?? null)
    : null;
  const accName = payload.accommodationId
    ? (accommodationFixtures.getById(payload.accommodationId)?.name ?? null)
    : null;
  const roomName = payload.roomId ? (roomFixtures.getById(payload.roomId)?.name ?? null) : null;
  const addonNames = payload.addonIds
    .map((id) => addonFixtures.getById(id)?.name ?? '')
    .filter(Boolean);
  const transferNames = payload.transferIds
    .map((id) => transferFixtures.getById(id)?.name ?? '')
    .filter(Boolean);

  return {
    courseId: payload.courseId,
    courseName,
    accommodationId: payload.accommodationId,
    accommodationName: accName,
    roomId: payload.roomId,
    roomName,
    addonIds: payload.addonIds,
    addonNames,
    transferIds: payload.transferIds,
    transferNames,
  };
}

export const packageFixtures = {
  getList: (params: { search?: string; page?: number; pageSize?: number } = {}) => {
    const filtered = filterBySearch(packageList, params.search ?? '');
    return pagedResult(filtered, params.page ?? 1, params.pageSize ?? 4);
  },
  getById: (id: number) => packageDetails.get(id) ?? null,
  create: (payload: CreatePackageRequestDto) => {
    const id = Math.max(0, ...packageList.map((p) => p.id)) + 1;
    const components = resolvePackageComponent(payload);
    const componentCount =
      (components.courseId ? 1 : 0) +
      (components.accommodationId ? 1 : 0) +
      components.addonIds.length +
      components.transferIds.length;
    const detail: PackageDetailsDto = {
      ...payload,
      id,
      divisionName: 'EC Malta',
      description: payload.description ?? '',
      components,
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt: '',
      updatedByName: '',
    };
    packageDetails.set(id, detail);
    packageList = [{ id, name: payload.name, isActive: payload.isActive, divisionId: payload.divisionId, divisionName: 'EC Malta', componentCount, createdAt, createdByName, updatedAt: '', updatedByName: '' }, ...packageList];
    return detail;
  },
  update: (id: number, payload: UpdatePackageRequestDto) => {
    const existing = packageDetails.get(id);
    if (!existing) return null;
    const components = resolvePackageComponent(payload);
    const updated: PackageDetailsDto = { ...existing, ...payload, id, divisionName: existing.divisionName, components, updatedAt, updatedByName };
    packageDetails.set(id, updated);
    packageList = packageList.map((p) => p.id === id ? { ...p, name: payload.name, isActive: payload.isActive, updatedAt, updatedByName } : p);
    return updated;
  },
};
