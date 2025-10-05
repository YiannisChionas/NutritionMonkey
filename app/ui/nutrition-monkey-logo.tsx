import Image from 'next/image';
import logo from '@/public/LOGO_NM.png';
import { lusitana } from '@/app/ui/fonts';

export default function NutritionMonkeyLogo() {
  return (
    <div className={`${lusitana.className} flex items-center gap-3 leading-none text-white min-w-0`}>
      <Image src={logo} alt="Logo" className="h-20 w-auto" priority />
      <span className="text-xl md:text-2xl leading-tight">
        Nutrition<br/>Monkey
      </span>
    </div>
  );
}