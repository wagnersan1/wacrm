-- Meta's webhook delivery is at-least-once: a timeout, network blip, or
-- retry window (docs: "Retries can produce duplicate notifications, so
-- your handler should be idempotent") can redeliver the exact same
-- message event. Nothing enforced inbound message inserts were
-- deduplicated, so a redelivered webhook would insert a second row with
-- the same message_id into the same conversation, duplicating the bubble
-- in the inbox and re-firing automations / AI auto-reply for it.
--
-- message_id is intentionally NOT globally unique (migration 009 — Meta
-- ids repeat across different phone numbers), so the constraint is scoped
-- to (conversation_id, message_id) instead. Partial index so legacy rows
-- and outbound messages with a NULL message_id are unaffected (Postgres
-- unique indexes already treat NULLs as distinct, but the explicit WHERE
-- keeps intent clear and skips indexing rows that can't collide anyway).
CREATE UNIQUE INDEX IF NOT EXISTS idx_messages_conversation_message_id_unique
  ON messages (conversation_id, message_id)
  WHERE message_id IS NOT NULL;
