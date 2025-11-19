"""Change created_at in flashcard.py and note.py from TEXT to TIMESTAMP WITH TIME ZONE

Revision ID: 96e5f8ea41e5
Revises: aeb8367e45cb
Create Date: 2025-09-15 20:22:33.108697

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '96e5f8ea41e5'
down_revision = 'aeb8367e45cb'
branch_labels = None
depends_on = None


def upgrade():
    # Change created_at in note.py from TEXT to TIMESTAMP WITH TIME ZONE
    op.alter_column(
        "notes",   # table name
        "created_at", 
        existing_type=sa.String(),
        type_=sa.DateTime(timezone=True),
        postgresql_using="created_at::timestamptz", # Cast text to timestamp with time zone
    )

    # Change created_at in flashcard.py from TEXT to TIMESTAMP WITH TIME ZONE
    op.alter_column(
        "flashcards",   # table name
        "created_at", 
        existing_type=sa.String(),
        type_=sa.DateTime(timezone=True),
        postgresql_using="created_at::timestamptz", # Cast text to timestamp with time zone
    )


def downgrade():
    # Revert created_at in note.py back to TEXT if needed
    op.alter_column(
        "notes",   # table name
        "created_at", 
        existing_type=sa.DateTime(timezone=True),
        type_=sa.String(),
    )

    # Revert created_at in flashcard.py back to TEXT if needed
    op.alter_column(
        "flashcards",   # table name
        "created_at", 
        existing_type=sa.DateTime(timezone=True),
        type_=sa.String(),
    )
