import styled from 'styled-components';
import { Flex } from '../flex';
import { Typography } from '../typography';
import { Button } from '../button';

interface ModalProps {
  open?: boolean;
  onCancel?: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.bgContainer};
  border-radius: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.primary};
  border: 2px solid ${({ theme }) => theme.colors.textBase};
  max-width: 500px;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const ModalHeader = styled(Flex)`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Modal = ({ open, onCancel, title, children, footer }: ModalProps) => {
  if (!open) return null;

  return (
    <Overlay onClick={onCancel}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader $justify="space-between" $align="center">
          <Typography $variant="h3">{title}</Typography>
          <Button $variant="ghost" $size="small" onClick={onCancel}>
            ✕
          </Button>
        </ModalHeader>
        <div>{children}</div>
        {footer !== null && (
          <Flex $justify="flex-end" $gap={2}>
            {footer || (
              <Button $variant="secondary" onClick={onCancel}>
                Закрыть
              </Button>
            )}
          </Flex>
        )}
      </ModalContainer>
    </Overlay>
  );
};

export { Modal };
