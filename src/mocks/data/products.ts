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
import {
  type AddOnDetailsDto,
  type AddOnListItemDto,
  type CreateAddOnRequestDto,
  type UpdateAddOnRequestDto,
  AddOnType,
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

const courseDetails = new Map(initialCourseDetails);

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
      accommodationTypeId: 1,
      isActive: true,
      minimumStayInWeeks: 1,
      minimumAge: 16,
      maximumAge: null,
      isCommitted: true,
      isNonCommitted: false,
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
      accommodationTypeId: 2,
      isActive: true,
      minimumStayInWeeks: 2,
      minimumAge: null,
      maximumAge: null,
      isCommitted: true,
      isNonCommitted: true,
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
  accommodationTypeName: d.accommodationTypeId === 1 ? 'Residence' : 'Host Family',
  isActive: d.isActive,
  createdAt: d.createdAt,
  createdByName: d.createdByName,
  updatedAt: d.updatedAt,
  updatedByName: d.updatedByName,
}));

const accommodationDetails = new Map(initialAccommodationDetails);

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
      minimumAge: payload.ageFrom ?? null,
      maximumAge: payload.ageTo ?? null,
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt: '',
      updatedByName: '',
    };
    accommodationDetails.set(id, detail);
    accommodationList = [{ id, name: payload.name, accommodationTypeName: '', isActive: payload.isActive, createdAt, createdByName, updatedAt: '', updatedByName: '' }, ...accommodationList];
    return detail;
  },
  update: (id: number, payload: UpdateAccommodationRequestDto) => {
    const existing = accommodationDetails.get(id);
    if (!existing) return null;
    const updated: AccommodationDetailsDto = {
      ...existing,
      ...payload,
      id,
      minimumAge: payload.ageFrom ?? null,
      maximumAge: payload.ageTo ?? null,
      updatedAt,
      updatedByName,
    };
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
      accommodationId: 1,
      divisionId: 7,
      unitTypeId: 1,
      isActive: true,
      occupyRoom: true,
      roomDetails: { roomTypeId: 1, boardTypeId: 1, bathroomTypeId: 2, roomGradeId: 1 },
      accountCategoryId: 2,
      productCategoryId: 2,
      generalLedgerCode: '5001-RS',
      costCentreCode: 'CC-MLT',
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
      name: 'Twin Shared',
      accommodationId: 1,
      divisionId: 7,
      unitTypeId: 1,
      isActive: true,
      occupyRoom: true,
      roomDetails: { roomTypeId: 2, boardTypeId: 1, bathroomTypeId: 2, roomGradeId: 1 },
      accountCategoryId: 2,
      productCategoryId: 2,
      generalLedgerCode: '5002-RS',
      costCentreCode: 'CC-MLT',
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
      name: 'Host Room',
      accommodationId: 2,
      divisionId: 7,
      unitTypeId: 1,
      isActive: true,
      occupyRoom: true,
      roomDetails: { roomTypeId: 1, boardTypeId: 3, bathroomTypeId: 1, roomGradeId: 2 },
      accountCategoryId: 2,
      productCategoryId: 2,
      generalLedgerCode: null,
      costCentreCode: null,
      closurePolicy: null,
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
  accommodationName: d.accommodationId === 1 ? 'Residence Malta' : 'Host Family',
  divisionName: 'EC Malta',
  isActive: d.isActive,
  occupyRoom: d.occupyRoom,
  createdAt: d.createdAt,
  createdByName: d.createdByName,
  updatedAt: d.updatedAt,
  updatedByName: d.updatedByName,
}));

const roomDetails = new Map(initialRoomDetails);

export const roomFixtures = {
  getList: (params: { accommodationId?: number; search?: string; page?: number; pageSize?: number } = {}) => {
    let items = roomList;
    if (params.accommodationId) {
      const accId = params.accommodationId;
      const matchingIds = new Set(
        Array.from(roomDetails.values())
          .filter((r) => r.accommodationId === accId)
          .map((r) => r.id),
      );
      items = items.filter((r) => matchingIds.has(r.id));
    }
    const filtered = filterBySearch(items, params.search ?? '');
    return pagedResult(filtered, params.page ?? 1, params.pageSize ?? 4);
  },
  getById: (id: number) => roomDetails.get(id) ?? null,
  create: (payload: CreateRoomRequestDto, accommodationId: number, divisionId: number) => {
    const id = Math.max(0, ...roomList.map((r) => r.id)) + 1;
    const accName = accommodationFixtures.getById(accommodationId)?.name ?? '';
    const detail: RoomDetailsDto = {
      ...payload,
      id,
      accommodationId,
      divisionId,
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt: '',
      updatedByName: '',
    };
    roomDetails.set(id, detail);
    roomList = [{ id, name: payload.name, accommodationName: accName, divisionName: 'EC Malta', isActive: payload.isActive, occupyRoom: payload.occupyRoom, createdAt, createdByName, updatedAt: '', updatedByName: '' }, ...roomList];
    return detail;
  },
  update: (id: number, payload: UpdateRoomRequestDto) => {
    const existing = roomDetails.get(id);
    if (!existing) return null;
    const updated: RoomDetailsDto = { ...existing, ...payload, id, accommodationId: existing.accommodationId, divisionId: existing.divisionId, updatedAt, updatedByName };
    roomDetails.set(id, updated);
    roomList = roomList.map((r) =>
      r.id === id ? { ...r, name: payload.name, isActive: payload.isActive, occupyRoom: payload.occupyRoom, updatedAt, updatedByName } : r,
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
      unitTypeId: 1,
      addOnType: AddOnType.Activity,
      ageFrom: null,
      ageTo: null,
      oneToOneLessonsPerWeek: null,
      accountCategoryId: 2,
      productCategoryId: 2,
      generalLedgerCode: null,
      costCentreCode: null,
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
      name: 'Meals Package',
      isActive: true,
      divisionId: 7,
      unitTypeId: 2,
      addOnType: AddOnType.Generic,
      ageFrom: 16,
      ageTo: null,
      oneToOneLessonsPerWeek: null,
      accountCategoryId: 1,
      productCategoryId: 1,
      generalLedgerCode: 'GL-MEALS',
      costCentreCode: null,
      closurePolicy: null,
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
  divisionName: 'EC Malta',
  addOnType: d.addOnType,
  createdAt: d.createdAt,
  createdByName: d.createdByName,
  updatedAt: d.updatedAt,
  updatedByName: d.updatedByName,
}));

const addonDetails = new Map(initialAddonDetails);

export const addonFixtures = {
  getList: (params: { search?: string; page?: number; pageSize?: number } = {}) => {
    const filtered = filterBySearch(addonList, params.search ?? '');
    return pagedResult(filtered, params.page ?? 1, params.pageSize ?? 4);
  },
  getById: (id: number) => addonDetails.get(id) ?? null,
  getAll: () => addonList,
  create: (divisionId: number, payload: CreateAddOnRequestDto) => {
    const id = Math.max(0, ...addonList.map((a) => a.id)) + 1;
    const detail: AddOnDetailsDto = { ...payload, id, divisionId, version: versionToken, createdAt, createdByName, updatedAt: '', updatedByName: '' };
    addonDetails.set(id, detail);
    addonList = [{ id, name: payload.name, isActive: payload.isActive, divisionName: 'EC Malta', addOnType: payload.addOnType, createdAt, createdByName, updatedAt: '', updatedByName: '' }, ...addonList];
    return detail;
  },
  update: (id: number, payload: UpdateAddOnRequestDto) => {
    const existing = addonDetails.get(id);
    if (!existing) return null;
    const updated: AddOnDetailsDto = { ...existing, ...payload, id, updatedAt, updatedByName };
    addonDetails.set(id, updated);
    addonList = addonList.map((a) => a.id === id ? { ...a, name: payload.name, isActive: payload.isActive, addOnType: payload.addOnType, updatedAt, updatedByName } : a);
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
      unitTypeId: 3,
      transferTypeId: 1,
      transferPortId: 1,
      timeFrom: '09:00',
      timeTo: '09:45',
      accountCategoryId: 3,
      productCategoryId: 2,
      generalLedgerCode: '4010-TR',
      costCentreCode: 'CC-MLT',
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
      name: 'Private Airport Transfer',
      isActive: true,
      divisionId: 7,
      unitTypeId: 3,
      transferTypeId: 1,
      transferPortId: 1,
      timeFrom: null,
      timeTo: null,
      accountCategoryId: 3,
      productCategoryId: 2,
      generalLedgerCode: null,
      costCentreCode: null,
      closurePolicy: null,
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
  divisionName: 'EC Malta',
  transferTypeId: d.transferTypeId,
  transferPortId: d.transferPortId,
  createdAt: d.createdAt,
  createdByName: d.createdByName,
  updatedAt: d.updatedAt,
  updatedByName: d.updatedByName,
}));

const transferDetails = new Map(initialTransferDetails);

export const transferFixtures = {
  getList: (params: { search?: string; page?: number; pageSize?: number } = {}) => {
    const filtered = filterBySearch(transferList, params.search ?? '');
    return pagedResult(filtered, params.page ?? 1, params.pageSize ?? 4);
  },
  getById: (id: number) => transferDetails.get(id) ?? null,
  getAll: () => transferList,
  create: (divisionId: number, payload: CreateTransferRequestDto) => {
    const id = Math.max(0, ...transferList.map((t) => t.id)) + 1;
    const detail: TransferDetailsDto = { ...payload, id, divisionId, version: versionToken, createdAt, createdByName, updatedAt: '', updatedByName: '' };
    transferDetails.set(id, detail);
    transferList = [{ id, name: payload.name, isActive: payload.isActive, divisionName: 'EC Malta', transferTypeId: payload.transferTypeId, transferPortId: payload.transferPortId, createdAt, createdByName, updatedAt: '', updatedByName: '' }, ...transferList];
    return detail;
  },
  update: (id: number, payload: UpdateTransferRequestDto) => {
    const existing = transferDetails.get(id);
    if (!existing) return null;
    const updated: TransferDetailsDto = { ...existing, ...payload, id, updatedAt, updatedByName };
    transferDetails.set(id, updated);
    transferList = transferList.map((t) => t.id === id ? { ...t, name: payload.name, isActive: payload.isActive, transferTypeId: payload.transferTypeId, transferPortId: payload.transferPortId, updatedAt, updatedByName } : t);
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
      divisionId: 1,
      unitTypeId: 1,
      description: 'General English + Residence + Standard Transfer.',
      commission: 10,
      ageFrom: 16,
      ageTo: 99,
      minimumWeeks: 2,
      accountCategoryId: 1,
      productCategoryId: 1,
      generalLedgerCode: '4001-PKG',
      costCentreCode: 'CC-PKG',
      closurePolicy: null,
      items: [
        { productKind: 1, productId: 1, priceBreakdown: 0 },
        { productKind: 4, productId: 1, priceBreakdown: 0 },
      ],
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
  divisionName: 'EC Malta',
  description: d.description,
  commission: d.commission,
  createdAt: d.createdAt,
  createdByName: d.createdByName,
  updatedAt: d.updatedAt,
  updatedByName: d.updatedByName,
}));

const packageDetails = new Map(initialPackageDetails);

export const packageFixtures = {
  getList: (params: { search?: string; page?: number; pageSize?: number } = {}) => {
    const filtered = filterBySearch(packageList, params.search ?? '');
    return pagedResult(filtered, params.page ?? 1, params.pageSize ?? 4);
  },
  getById: (id: number) => packageDetails.get(id) ?? null,
  create: (divisionId: number, payload: CreatePackageRequestDto) => {
    const id = Math.max(0, ...packageList.map((p) => p.id)) + 1;
    const detail: PackageDetailsDto = {
      ...payload,
      id,
      divisionId,
      version: versionToken,
      createdAt,
      createdByName,
      updatedAt: '',
      updatedByName: '',
    };
    packageDetails.set(id, detail);
    packageList = [{
      id,
      name: payload.name,
      isActive: payload.isActive,
      divisionName: 'EC Malta',
      description: payload.description,
      commission: payload.commission,
      createdAt,
      createdByName,
      updatedAt: '',
      updatedByName: '',
    }, ...packageList];
    return detail;
  },
  update: (id: number, payload: UpdatePackageRequestDto) => {
    const existing = packageDetails.get(id);
    if (!existing) return null;
    const updated: PackageDetailsDto = { ...existing, ...payload, id, divisionId: existing.divisionId, updatedAt, updatedByName };
    packageDetails.set(id, updated);
    packageList = packageList.map((p) => p.id === id
      ? { ...p, name: payload.name, isActive: payload.isActive, description: payload.description, commission: payload.commission, updatedAt, updatedByName }
      : p
    );
    return updated;
  },
};
