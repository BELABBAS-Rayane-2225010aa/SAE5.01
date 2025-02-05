import { css } from 'lit';

// these styles can be imported from any component
// for an example of how to use this, check /pages/about-about.ts
export const style = css`
/* position of the buttons */
button {
    margin-left: 0.7vw;
}

/* column title of the table is special bacause there can be a lot of characters in it */
.title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* table border and position of the text */
td {
    padding: 0.5rem;
    border-top: 1px solid #e2e8f0;
}

/* table border */
td:not(.title) {
    border-left: 1px solid #e2e8f0;
}
`;