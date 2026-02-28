import styled from 'styled-components';

import React, { useRef, useState } from 'react';

import { EditIcon, TrashIcon } from '@/shared/assets/icons';
import { UpdateNoteModal } from '@/shared/components';
import {
  Card,
  CardTitle,
  Flex,
  Skeleton,
  Typography,
} from '@/shared/components/ui';
import type { NoteType } from '@/shared/types';
import { Trigger } from '@/shared/ui';

interface NoteCardProps {
  note: NoteType;
  isLoading: boolean;
  onDelete: (id: string) => void;
}

const StyledCard = styled(Card)<{ $rotateX: number; $rotateY: number }>`
  min-width: 300px;
  max-width: 600px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow:
      ${({ theme }) => theme.shadows.primary},
      0 20px 40px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
`;

const IconButton = styled.button<{ $variant?: 'danger' | 'primary' }>`
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;
  color: ${({ $variant, theme }) =>
    $variant === 'danger' ? '#ff4d4f' : theme.colors.primary};

  &:hover {
    background-color: ${({ $variant, theme }) =>
      $variant === 'danger'
        ? 'rgba(255, 77, 79, 0.1)'
        : `${theme.colors.primary}1a`};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const NoteCard = ({ note, isLoading, onDelete }: NoteCardProps) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isLoading) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const maxRotation = 10;

    const rotateX = ((y - centerY) / centerY) * -maxRotation;
    const rotateY = ((x - centerX) / centerX) * maxRotation;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  if (isLoading) {
    return (
      <Card
        style={{
          minWidth: '300px',
          maxWidth: '600px',
          width: '100%',
          height: '100%',
        }}
      >
        <Flex $vertical $gap={4}>
          <Skeleton $height="28px" $width="60%" />
          <Skeleton $height="20px" $width="90%" />
          <Skeleton $height="20px" $width="80%" />
          <Flex $gap={2} $justify="flex-end" style={{ marginTop: 'auto' }}>
            <Skeleton $height="32px" $width="32px" />
            <Skeleton $height="32px" $width="32px" />
          </Flex>
        </Flex>
      </Card>
    );
  }

  const { title, description, id } = note;

  return (
    <StyledCard
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      $rotateX={rotate.x}
      $rotateY={rotate.y}
    >
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <Typography $variant="body">{description}</Typography>
      </CardContent>
      <Flex $justify="flex-end" $gap={2} style={{ marginTop: 'auto' }}>
        <Trigger
          modal={<UpdateNoteModal noteValues={{ id, title, description }} />}
        >
          <IconButton title="Изменить">
            <EditIcon size={20} />
          </IconButton>
        </Trigger>
        <IconButton
          $variant="danger"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          title="Удалить"
        >
          <TrashIcon size={20} />
        </IconButton>
      </Flex>
    </StyledCard>
  );
};
