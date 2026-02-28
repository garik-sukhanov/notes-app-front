import styled from 'styled-components';

import React, { useRef, useState } from 'react';

import { UpdateNoteModal } from '@/shared/components';
import {
  Button,
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
  transition:
    transform 0.3s ease-out,
    box-shadow 0.3s ease-out;
  transform: perspective(5000px) rotateX(${({ $rotateX }) => $rotateX}deg)
    rotateY(${({ $rotateY }) => $rotateY}deg) scale3d(1.001, 1.001, 1.001);
  will-change: transform;
  cursor: pointer;

  &:hover {
    box-shadow:
      ${({ theme }) => theme.shadows.primary},
      0 20px 40px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
`;

const StaticCard = styled(Card)`
  min-width: 300px;
  max-width: 600px;
  width: 100%;
  height: 100%;
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

    // Максимальный угол наклона (градусы)
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
      <StaticCard>
        <Flex $vertical $gap={4}>
          <Skeleton $height="28px" $width="60%" />
          <Skeleton $height="20px" $width="90%" />
          <Skeleton $height="20px" $width="80%" />
          <Flex $gap={2} $justify="flex-end" style={{ marginTop: 'auto' }}>
            <Skeleton $height="32px" $width="80px" />
            <Skeleton $height="32px" $width="80px" />
          </Flex>
        </Flex>
      </StaticCard>
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
      <CardTitle>{title}</CardTitle>
      <Typography $variant="body">{description}</Typography>
      <Flex $gap={2} $justify="flex-end" style={{ marginTop: 'auto' }}>
        <Trigger
          modal={<UpdateNoteModal noteValues={{ id, title, description }} />}
        >
          <Button $variant="secondary" $size="small">
            Изменить
          </Button>
        </Trigger>
        <Button
          $variant="secondary"
          $size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          Удалить
        </Button>
      </Flex>
    </StyledCard>
  );
};
