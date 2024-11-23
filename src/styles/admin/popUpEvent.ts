import { css } from 'lit';

// these styles can be imported from any component
// for an example of how to use this, check /pages/about-about.ts
export const style = css`
/* Pop-up Event */
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Pop-up content */
.popup-content {
    background: rgb(255, 255, 255);
    padding: 20px;
    border-radius: 5px;
    width: 45vw;
    max-height: 80vh; /* Set a maximum height */
    overflow: auto; /* Enable scrolling */
    font-size: 1.1rem;
}

/* Pop-up title */
.popupTitle {
    font-size: 1.5rem;
    margin-bottom: 20px;
}

/* Form groups */
.form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
}

/* Input group for the images and links without the label*/
.input-button-group {
    display: flex;
    align-items: center;
}

.input-button-group input {
    margin-right: 10px;
}

/* Input fields for the images and links*/
#imageUrl, #link {
    width: 35vw;
}

/* Input fields without those for the images and links*/
input:not(#imageUrl,#link), textarea {
    width: 43vw;
}

/* Textarea for the description */
#description {
    height: 15vw;
    resize: none;
}

/* Button group */
button:not(.submitBtn) {
    width: auto;
    margin-top: 0;
}

/* Submit button */
.submitBtn {
    width: 43vw;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Table for the images and links*/
.added-items-table {
    width: 100%;
    border-collapse: collapse;
}

.added-items-table td {
    border: 1px solid #ddd;
    padding: 8px;
    vertical-align: middle;
}

.link-cell {
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 0;
}

.link-cell a, .link-cell p {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
}

.button-cell {
    width: 30%;
    text-align: right;
}

.button-cell button {
    margin-left: 5px;
}
`;