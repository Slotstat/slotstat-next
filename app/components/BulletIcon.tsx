const BulletIcon = ({ color = '#5887F5', size = 20 }) => {
   return (
      <svg
         width={size}
         height={size}
         viewBox='0 0 20 20'
         fill='none'
         xmlns='http://www.w3.org/2000/svg'>
         <circle cx='10' cy='10' r='9' stroke={color} strokeWidth='2' />
         <circle cx='10' cy='9.99981' r='5.2381' fill='url(#paint0_linear_2249_4511)' />
         <defs>
            <linearGradient
               id='paint0_linear_2249_4511'
               x1='10'
               y1='4.76172'
               x2='10'
               y2='15.2379'
               gradientUnits='userSpaceOnUse'>
               <stop stopColor={color} />
               <stop offset='1' stopColor={color} stopOpacity='0' />
            </linearGradient>
         </defs>
      </svg>
   );
};

export default BulletIcon;
