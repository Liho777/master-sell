-- Создание базы данных и пользователя для локальной разработки MasterSell
-- Запускать через psql от имени суперпользователя postgres:
--   psql -U postgres -f scripts/init-db.sql
--
-- Если база mastersell уже существует, удалите её вручную перед запуском:
--   DROP DATABASE IF EXISTS mastersell;

CREATE USER mastersell WITH PASSWORD 'mastersell_dev_pass' CREATEDB;
CREATE DATABASE mastersell OWNER mastersell ENCODING 'UTF8';
