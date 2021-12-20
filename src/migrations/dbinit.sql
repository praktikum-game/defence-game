DROP TABLE IF EXISTS crud_test;

CREATE TABLE IF NOT EXISTS crud_test
(
    id SERIAL,
    text character varying(1024) COLLATE pg_catalog."default" NOT NULL,
    descr character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT crud_test_pkey PRIMARY KEY (id)
);

COMMENT ON TABLE crud_test IS 'тестовая таблица для проверки crud';

insert into crud_test(text, descr) values('text1', 'descr1');
insert into crud_test(text, descr) values('text2', '');
insert into crud_test(text, descr) values('text3', NULL );
insert into crud_test(text, descr) values('another text', 'another description');