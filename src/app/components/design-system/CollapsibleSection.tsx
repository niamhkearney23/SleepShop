import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export const CollapsibleSection = ({ title, children, defaultOpen = false }: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible.Root 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className="border-b border-[#E8E6E3] py-6 sm:py-8"
    >
      <Collapsible.Trigger className="flex w-full justify-between items-center group touch-manipulation min-h-[48px]">
        <h3 className="font-['Inter'] text-[15px] sm:text-[16px] lg:text-[18px] text-[#5D4E7A] font-medium text-left pr-4">
          {title}
        </h3>
        <ChevronDown 
          className={`w-5 h-5 sm:w-6 sm:h-6 text-[#B4A7D6] transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </Collapsible.Trigger>
      
      <Collapsible.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
        <div className="pt-6 sm:pt-8 font-['Inter'] text-[15px] sm:text-[15px] leading-[1.9] sm:leading-[2] text-[#7A7A7A] font-light space-y-4 sm:space-y-5">
          {children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};