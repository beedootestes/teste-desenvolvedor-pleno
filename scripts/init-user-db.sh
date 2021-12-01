#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE questions;
    \c questions;
    GRANT ALL PRIVILEGES ON DATABASE questions TO matheus;
EOSQL