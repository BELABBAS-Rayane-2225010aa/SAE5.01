import { css } from 'lit';

export const style = css`

    page-header {
        display: block;
        width: 100%;
        height: 60px;
        background-size: cover;
        background-position: center;
    }
    page-header::before {
        content: "";
        display: block;
        background-image: url('/assets/images/solaire/header.png');
        background-size: cover;
        background-position: center;
        width: 100%;
        height: 150%;
    }

    .photovoltaique-wrap {
        padding-bottom: 48px;

        section {
            padding-left: 24px;
            padding-right: 24px;
        }

        .description {
            ul {
                list-style-type: '\\203A';

                li {
                    padding-left: 4px;
                }
            }
        }

        .installation {
            li {
                margin-top: 0.25em;
            }
        }

        .custom-cards {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;

            .custom-card {
                width: 100%;
                max-width: 360px;
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
                border-radius: 16px;
                padding: 24px;

                .text {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: auto;
                }

                img {
                    width: 100%;
                    height: 240px;
                    object-fit: contain;
                }

                p {
                    margin-top: 0.25em;
                }
            }
        }
    }
`;