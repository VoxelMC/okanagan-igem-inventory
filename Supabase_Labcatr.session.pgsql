CREATE FUNCTION IF NOT EXISTS BEGIN EXECUTE 'CREATE TABLE ' || table_name || ' (
        id bigint primary key generated always as identity
    )';
END;