import { css } from 'lit';

export const style = css`

    .photovoltaique-wrap {
        margin-top: 70px;
        padding-top: 48px;
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