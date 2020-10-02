import { SubItem } from 'src/app/sub-item/model/subitem.model';

export interface Item {
  id: number;
  nome: string;
  subitens: SubItem[];
}
