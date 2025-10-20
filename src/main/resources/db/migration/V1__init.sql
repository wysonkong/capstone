CREATE SEQUENCE IF NOT EXISTS user_seq START WITH 1 INCREMENT BY 50;

CREATE SEQUENCE IF NOT EXISTS widget_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE "user"
(
    id       BIGINT       NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

CREATE TABLE widget
(
    id          BIGINT       NOT NULL,
    name        VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    amount      INTEGER      NOT NULL,
    image       VARCHAR(255),
    user_id     BIGINT,
    created     date,
    CONSTRAINT pk_widget PRIMARY KEY (id)
);

ALTER TABLE "user"
    ADD CONSTRAINT uc_user_username UNIQUE (username);

ALTER TABLE widget
    ADD CONSTRAINT FK_WIDGET_ON_USER FOREIGN KEY (user_id) REFERENCES "user" (id);