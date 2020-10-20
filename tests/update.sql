-- SQLite
UPDATE versions
SET version = version+1, updated_at = CURRENT_TIMESTAMP
WHERE project = "test";