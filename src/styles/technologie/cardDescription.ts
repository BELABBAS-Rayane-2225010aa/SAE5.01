import { css } from 'lit';

export const style = css`
    .description__container {
        display: flex;
        flex-direction: column;
        gap: 50px;
        padding: 20px;
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(10, 10, 10, 0.9));
        border-radius: 15px;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.6), 0px 0px 30px rgba(0, 255, 255, 0.2);
    }

    .description__container p {
        font-family: 'Roboto', sans-serif;
        font-size: 1.1em;
        line-height: 1.6;
        color: #d9d9d9;
        text-align: justify;
        padding: 10px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5), 0px 0px 10px rgba(0, 150, 255, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
    }

    .description__container p:hover {
        transform: translateY(-2px);
        box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.6), 0px 0px 15px rgba(0, 150, 255, 0.4);
    }

    @media screen and (max-width: 1024px) {
        .description__container {
            gap: 30px;
        }
    }

    @media screen and (max-width: 768px) {
        .description__container {
            padding: 15px;
        }

        .description__container p {
            font-size: 1em;
            padding: 8px;
        }
    }
`;
