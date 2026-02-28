import 'styled-components';
import { ThemeTokens } from '@/shared/tokens';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeTokens {}
}
