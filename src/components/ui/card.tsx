import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card = ({ children, className = "", ...props }: CardProps) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`} {...props}>
    {children}
  </div>
);

export { Card };
