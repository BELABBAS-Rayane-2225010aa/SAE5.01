import { css } from 'lit';

// these styles can be imported from any component
// for an example of how to use this, check /pages/about-about.ts
export const style = css`
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.shop__ul {
  margin-top: 20px;
}

.shop__select {
  display: flex;
  gap: 10px;
  width: fit-content;
}

`;