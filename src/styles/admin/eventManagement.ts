import { css } from 'lit';

// these styles can be imported from any component
// for an example of how to use this, check /pages/about-about.ts
export const style = css`
/* container of the tab of the events */
    .tab-container {
        margin-top: 20px;
        overflow-x: auto;
    }

    /* tab of the events */
    .event-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    }

    /* table header */
    .event-table th,
    .event-table td {
    padding: 8px;
    text-align: left;
    background-color: #555555;
    font-weight: bold;
    }

    /* table border of the header */
    .event-table th:not(.title-column) {
        border-left: 1px solid #e2e8f0;
    }

    /* the title column is special because there can be a lot of text in it */
    .title-column {
    width: 600px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
`;