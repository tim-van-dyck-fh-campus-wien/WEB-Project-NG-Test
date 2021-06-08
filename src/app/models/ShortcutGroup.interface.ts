import { ShortcutElement } from './ShortcutElement.interface';
export interface ShortcutGroup{
    _id:string;
    name:string;
    elements:ShortcutElement[];
}