const BulletIcon = ({ color = "#5887F6", size = 20 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={size}
      height={size}
      viewBox="0 0 20 20"
    >
      <circle cx={10} cy={10} r={9} stroke={color} strokeWidth={2} />
      <circle cx={10} cy={10} r={5.238} fill="url(#a)" />
      <defs>
        <linearGradient
          id="a"
          x1={10}
          x2={10}
          y1={4.762}
          y2={15.238}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} />
          <stop offset={1} stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BulletIcon;
