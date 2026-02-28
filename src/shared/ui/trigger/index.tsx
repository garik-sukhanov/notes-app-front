import { type ReactElement, cloneElement, useState } from 'react';

export type TriggerProps = {
  children: ReactElement<{ onClick?: () => void }>;
  modal: ReactElement<{ open?: boolean; onCancel?: () => void }>;
};

export const Trigger = ({ children, modal }: TriggerProps) => {
  const [isActive, setActive] = useState(false);

  const toggleActive = () => {
    setActive((prev) => !prev);
  };

  const closeActive = () => {
    setActive(false);
  };

  return (
    <>
      {cloneElement(children, { onClick: toggleActive })}
      {isActive &&
        cloneElement(modal, {
          open: isActive,
          onCancel: closeActive,
        })}
    </>
  );
};
