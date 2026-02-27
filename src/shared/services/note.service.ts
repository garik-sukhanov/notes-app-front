import { instance } from '../api/instance';
import type { NoteType } from '../types';
import type { GetNotesResponseDto } from '../types/dto';

class NoteService {
  private _SPACES = '/spaces';

  getAll() {
    return instance.get<GetNotesResponseDto>(this._SPACES);
  }

  create(data: Omit<NoteType, 'id'>) {
    return instance.post(this._SPACES, data);
  }

  update(data: NoteType) {
    return instance.patch(`${this._SPACES}/${data.id}`, data);
  }

  delete(id: string) {
    return instance.delete(`${this._SPACES}/${id}`);
  }
}

export const noteService = new NoteService();
