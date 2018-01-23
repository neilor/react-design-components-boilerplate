/** TodoMVC model definitions **/

declare interface ITodoItemData {
  id: ITodoItemId;
  text: string;
  completed: boolean;
}

declare type ITodoItemId = number;

declare type ITodoFilterType = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';

declare type ITodoStoreState = ITodoItemData[];
