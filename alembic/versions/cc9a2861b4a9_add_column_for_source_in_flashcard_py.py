"""Add column for source in flashcard.py

Revision ID: cc9a2861b4a9
Revises: 96e5f8ea41e5
Create Date: 2025-09-16 16:47:36.313806

"""

from alembic import op
import sqlalchemy as sa
from app.schemas.flashcard import FlashcardSource


# revision identifiers, used by Alembic.
revision: str = 'cc9a2861b4a9'
down_revision = '96e5f8ea41e5'
branch_labels = None
depends_on = None


def upgrade():
    # create enum type for 'source' column
    flashcard_source_enum = sa.Enum(*[e.value for e in FlashcardSource], name='flashcard_source')
    flashcard_source_enum.create(op.get_bind(), checkfirst=True)
    # add 'source' column to 'flashcards' table
    op.add_column('flashcards', sa.Column('source', sa.Enum('ai_generated', 'user_created', name='flashcard_source'), nullable=False, server_default='user_created'))


def downgrade():
    # remove 'source' column from 'flashcards' table
    op.drop_column('flashcards', 'source')
    # drop enum type for 'source' column
    flashcard_source_enum = sa.Enum(name='flashcard_source')
    flashcard_source_enum.drop(op.get_bind(), checkfirst=True)
