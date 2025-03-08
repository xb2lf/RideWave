import Svg, { Path } from 'react-native-svg';
import React from 'react';

export function History({ colors }: { colors?: string }) {
  return (
    <Svg width='22' height='22' viewBox='0 0 22 22' fill='none'>
      <Path
        d='M11.001 7.33435V11.001L13.2926 13.2927'
        stroke={colors || '#8F8F8F'}
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <Path
        d='M5.13811 5.13823L4.60778 4.6079L4.60778 4.6079L5.13811 5.13823ZM3.97726 6.29908L3.22727 6.30284C3.22933 6.71411 3.56222 7.047 3.97349 7.04907L3.97726 6.29908ZM6.30691 7.06079C6.72112 7.06287 7.05859 6.72878 7.06067 6.31457C7.06275 5.90036 6.72866 5.56289 6.31445 5.56081L6.30691 7.06079ZM4.71552 3.96188C4.71344 3.54768 4.37597 3.21358 3.96176 3.21566C3.54755 3.21774 3.21346 3.55521 3.21554 3.96942L4.71552 3.96188ZM3.57062 9.89576C3.62687 9.48539 3.33979 9.10711 2.92942 9.05086C2.51904 8.99461 2.14077 9.28169 2.08452 9.69206L3.57062 9.89576ZM17.3355 4.66653C13.8097 1.1407 8.11128 1.1044 4.60778 4.6079L5.66844 5.66856C8.57613 2.76087 13.3248 2.77707 16.2749 5.72719L17.3355 4.66653ZM4.6664 17.3357C8.19223 20.8615 13.8907 20.8978 17.3942 17.3943L16.3335 16.3336C13.4258 19.2413 8.67718 19.2251 5.72706 16.275L4.6664 17.3357ZM17.3942 17.3943C20.8977 13.8908 20.8614 8.19236 17.3355 4.66653L16.2749 5.72719C19.225 8.67731 19.2412 13.426 16.3335 16.3336L17.3942 17.3943ZM4.60778 4.6079L3.44693 5.76875L4.50759 6.82941L5.66844 5.66856L4.60778 4.6079ZM3.97349 7.04907L6.30691 7.06079L6.31445 5.56081L3.98103 5.54909L3.97349 7.04907ZM4.72725 6.29531L4.71552 3.96188L3.21554 3.96942L3.22727 6.30284L4.72725 6.29531ZM2.08452 9.69206C1.71398 12.3954 2.5769 15.2462 4.6664 17.3357L5.72706 16.275C3.98084 14.5288 3.26154 12.1507 3.57062 9.89576L2.08452 9.69206Z'
        stroke={colors || '#8F8F8F'}
      />
    </Svg>
  );
}
