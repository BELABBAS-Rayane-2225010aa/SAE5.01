import { css } from 'lit';

export const style = css`
    .card {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 20px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 15px;
        max-width: 800px;
        margin: auto;
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5), 0px 0px 15px rgba(0, 150, 255, 0.2);
        transition: transform 0.3s, box-shadow 0.3s;
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.6), 0px 0px 25px rgba(0, 150, 255, 0.4);
    }

    @media screen and (max-width: 1024px) {
        .card {
            flex-direction: column;
            max-height: fit-content;
        }
    }

    .card-description,
    .card-description-fullwidth {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 15px;
        color: #d9d9d9;
        font-family: 'Roboto', sans-serif;
        text-align: justify;
        transition: 0.3s ease-in-out;
    }

    .card-description {
        width: 60%;
    }

    .card-description-fullwidth {
        width: 100%;
    }

    @media screen and (max-width: 768px) {
        .card-description {
            width: 100%;
        }
    }

    .card-description h2 {
        font-size: 1.8em;
        color: #00ffff;
        text-shadow: 0px 0px 8px rgba(0, 255, 255, 0.8);
        margin: 0;
    }

    .card-description h3 {
        font-size: 1.4em;
        color: #007bff;
        text-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
    }

    .card-description p {
        font-size: 1em;
        line-height: 1.5;
        color: #d9d9d9;
    }

    .card-image {
        width: 40%;
        max-height: 300px;
        object-fit: cover;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5), 0px 0px 10px rgba(0, 150, 255, 0.3);
        transition: transform 0.3s, box-shadow 0.3s;
    }

    .card-image:hover {
        transform: scale(1.05);
        box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.6), 0px 0px 20px rgba(0, 150, 255, 0.4);
    }

    @media screen and (max-width: 768px) {
        .card-image {
            width: 80%;
            max-height: 200px;
        }
    }
`;