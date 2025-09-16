"""Change created_at from TEXT to TIMESTAMP WITH TIME ZONE

Revision ID: aeb8367e45cb
Revises: 8c6187bd447a
Create Date: 2025-09-15 19:55:48.020108

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'aeb8367e45cb'
down_revision = '8c6187bd447a'
branch_labels = None
depends_on = None


def upgrade():
    # Change created_at from TEXT to TIMESTAMP WITH TIME ZONE
    op.alter_column(
        "users",  # table name
        "created_at",
        existing_type=sa.String(),
        type_=sa.DateTime(timezone=True),
        postgresql_using="created_at::timestamptz",  # Cast text to timestamptz
    )


def downgrade():
    # Revert back to TEXT if needed
    op.alter_column(
        "users",
        "created_at",
        existing_type=sa.DateTime(timezone=True),
        type_=sa.String(),
    )
