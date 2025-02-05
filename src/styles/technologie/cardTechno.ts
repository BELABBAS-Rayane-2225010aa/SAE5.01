import { css } from 'lit';

export const style = css`
    .cardTechno {
        width: 300px;
        height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 8px;
        box-shadow: -1px 0 15px 1px rgba(0, 0, 0, 0.27);
        padding: 10px;
        transition: 0.3s ease-in-out;
    }

    .cardTechno:hover {
        transform: scale(1.02);
    }

    .cardImageTechno {
        border-radius: 4px;
        width: 100%;
        height: 200px;
        object-fit: cover;
    }

    .cardTextTechno {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    .cardTextTechno h3 {
        padding-top: 10px;
    }
    .cardButtonTechno {
        margin: 10px auto;
    }
`;