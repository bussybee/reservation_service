create TABLE IF NOT EXISTS users
(
    user_id      BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    email        varchar not null unique,
    password     varchar not null,
    role         varchar,
    last_name    varchar,
    first_name   varchar,
    age          integer,
    gender       varchar,
    phone_number varchar
);

create TABLE IF NOT EXISTS institutions
(
    id         BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name       varchar,
    address    varchar,
    rating     numeric,
    type       varchar,
    created_at timestamp without time zone,
    image      bytea
);

create table if not exists comments
(
    id             BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    institution_id BIGINT,
    author_id      BIGINT,
    created_on     timestamp WITHOUT TIME ZONE,
    comment        varchar,
    rating         numeric,
    CONSTRAINT fk_comments FOREIGN KEY (institution_id) REFERENCES institutions (id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_users FOREIGN KEY (author_id) REFERENCES users (user_id) ON DELETE CASCADE
);

create table if not exists feedbacks(
                                        id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                                        name varchar,
                                        message varchar
);

CREATE TABLE IF NOT EXISTS courses
(
    duration double precision,
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    institution_id bigint NOT NULL,
    start_time timestamp(6) without time zone,
    course_name character varying(255),
    CONSTRAINT courses_pkey PRIMARY KEY (id),
    CONSTRAINT fk9j9pt3rv7axxvf4l2svqpwus3 FOREIGN KEY (institution_id)
        REFERENCES public.institutions (id) ON DELETE CASCADE
);