import { Resource } from './Resource';

export interface ResourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Resource[]
}
