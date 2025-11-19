"""add FlashcardStatus column to user_flashcard_status table

Revision ID: 22a59ddd54f3
Revises: cc9a2861b4a9
Create Date: 2025-09-16 17:46:50.969739

"""

from alembic import op
import sqlalchemy as sa
from app.schemas.user_flashcard_progress import FlashcardStatus

# revision identifiers, used by Alembic.
revision: str = '22a59ddd54f3'
down_revision = 'cc9a2861b4a9'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # add new enum type for flashcard status
    flashcard_status_enum = sa.Enum(*[e.value for e in FlashcardStatus], name='flashcard_status')
    flashcard_status_enum.create(op.get_bind(), checkfirst=True)
    # add 'status' column to 'user_flashcard_progress' table
    op.add_column('user_flashcard_progress', sa.Column('status', sa.Enum('unseen', 'learning', 'reviewing', 'mastered', name='flashcard_status'), nullable=False, server_default='unseen'))


def downgrade() -> None:
    # remove 'status' column from 'user_flashcard_progress' table
    op.drop_column('user_flashcard_progress', 'status')
    # drop enum type for 'status' column
    flashcard_status_enum = sa.Enum(name='flashcard_status')
    flashcard_status_enum.drop(op.get_bind(), checkfirst=True)
    
