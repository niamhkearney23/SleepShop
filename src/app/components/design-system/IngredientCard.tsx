interface IngredientCardProps {
  name: string;
  amount: string;
  purpose: string;
}

export const IngredientCard = ({ name, amount, purpose }: IngredientCardProps) => {
  return (
    <div className="border-b border-[#E8E6E3] pb-6 last:border-0">
      <div className="flex justify-between items-baseline mb-2">
        <h4 className="font-['Inter'] text-[16px] text-[#5D4E7A] font-medium">{name}</h4>
        <span className="font-['Inter'] text-[14px] text-[#7A7A7A] font-light">{amount}</span>
      </div>
      <p className="font-['Inter'] text-[14px] text-[#7A7A7A] leading-[1.8] font-light">{purpose}</p>
    </div>
  );
};