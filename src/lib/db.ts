import Dexie, { Table } from 'dexie';

export interface PendingRequest {
  id?: number;
  url: string;
  method: string;
  payload: unknown;
  type: 'story' | 'project' | 'contact' | 'testimonial';
  status: 'pending' | 'failed';
  createdAt: number;
}

export class PortfolioDB extends Dexie {
  pendingRequests!: Table<PendingRequest, number>;

  constructor() {
    super('PortfolioDB');
    this.version(1).stores({
      pendingRequests: '++id, type, status, createdAt',
    });
  }
}

export const db = new PortfolioDB();
