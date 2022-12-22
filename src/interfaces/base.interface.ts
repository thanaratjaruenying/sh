export interface Base {
  createdAt: Date;
  id: number;
  updatedAt: Date;
}

export interface BaseWithoutId {
  createdAt: Date;
  updatedAt: Date;
}
