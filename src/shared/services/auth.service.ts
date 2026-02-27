import type { AxiosResponse } from "axios";
import { instance } from "../api/instance";
import type { LoginDto, LoginResponseDto, RegisterDto, RegisterResponseDto } from "../types/dto";

class AuthService {
  private _AUTH: string = '/auth';

  public login(dto: LoginDto): Promise<AxiosResponse<LoginResponseDto>> {
    return instance.post(`${this._AUTH}/login`, dto);
  }

  public register(dto: RegisterDto): Promise<AxiosResponse<RegisterResponseDto>> {
    return instance.post(`${this._AUTH}/register`, dto);
  }
};

export const authService = new AuthService();