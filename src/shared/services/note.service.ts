import { instance } from '../api/instance';
import type { NoteType } from '../types';
import type { GetNotesResponseDto } from '../types/dto';

class NoteService {
  private _NOTES = '/notes';

  getAll() {
    return instance.get<GetNotesResponseDto>(this._NOTES);
  }

  create(data: Omit<NoteType, 'id'>) {
    return instance.post(this._NOTES, data);
  }

  update(data: NoteType) {
    return instance.patch(`${this._NOTES}/${data.id}`, data);
  }

  delete(id: string) {
    return instance.delete(`${this._NOTES}/${id}`);
  }
}

export const noteService = new NoteService();
