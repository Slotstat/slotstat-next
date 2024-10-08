import * as React from "react";
export const Checkmark = () => (
  <svg width={9} height={16} fill="none">
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7 7-3.2 3.2-1.6-1.6"
    />
  </svg>
);

export const ArrowDown = () => (
  <svg className=" ml-1" width={16} height={16} fill="none">
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11 6 7.8 9.2 4.6 6"
    />
  </svg>
);

export const ArrowLeft = () => {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M11.53 5.47a.75.75 0 010 1.06l-4.72 4.72H19a.75.75 0 010 1.5H6.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const ArrowLinkBig = () => {
  return (
    <>
      <svg width={24} height={24} fill="none">
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="m14.679 10.32-6.36 6.361M8.836 10.328l5.846-.013-.012 5.847"
        />
      </svg>
    </>
  );
};
export const ArrowLinkSmall = () => {
  return (
    <>
      <svg width={16} height={16} fill="none">
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="m9.786 6.881-4.24 4.24M5.89 6.886l3.899-.009-.009 3.898"
        />
      </svg>
    </>
  );
};

export const ArrowUp = () => (
  <svg width={10} height={6} fill="none">
    <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="m1 5 4-4 4 4" />
  </svg>
);

export const ArrowUpWithStickIcon = ({ isWriting }: { isWriting: boolean }) => (
  <svg width="11" height="11" fill="none" viewBox="0 0 11 11">
    <path
      stroke={isWriting ? "#fff" : "#3C3F49"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5.126 1.007v8.995M1 5.143L5.125.999l4.126 4.144"
    ></path>
  </svg>
);

export const ProfileIcon = ({ active = false }) => (
  <svg width={16} height={16} fill="none">
    <path
      fill={active ? "#fff" : "#969CB0"}
      d="M8 8a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.667ZM8 9.666c-3.34 0-6.06 2.24-6.06 5a.33.33 0 0 0 .333.333h11.453a.33.33 0 0 0 .333-.333c0-2.76-2.72-5-6.06-5Z"
    />
  </svg>
);

export const LogoutIcon = ({ active = false }) => (
  <svg width={16} height={16} fill="none">
    <path
      fill={active ? "#fff" : "#969CB0"}
      d="M5.253 8.047c0-.273.227-.5.5-.5h3.654v-5.64a.579.579 0 0 0-.58-.573c-3.927 0-6.667 2.74-6.667 6.667 0 3.926 2.74 6.666 6.667 6.666a.573.573 0 0 0 .573-.573V8.541H5.753a.49.49 0 0 1-.5-.494Z"
    />
    <path
      fill={active ? "#fff" : "#969CB0"}
      d="m13.694 7.693-1.894-1.9a.503.503 0 0 0-.706 0 .503.503 0 0 0 0 .707l1.04 1.04H9.4v1h2.727l-1.04 1.04a.503.503 0 0 0 0 .707c.1.1.227.146.353.146a.494.494 0 0 0 .354-.146l1.893-1.9c.2-.187.2-.5.007-.694Z"
    />
  </svg>
);
export const GeneralIcon = ({ active = false }) => (
  <svg width={16} height={16} fill="none">
    <path
      fill={active ? "#fff" : "#969CB0"}
      d="M13.4 6.146c-1.206 0-1.7-.853-1.1-1.9.347-.606.14-1.38-.466-1.726l-1.153-.66a1.113 1.113 0 0 0-1.52.4l-.074.126c-.6 1.047-1.586 1.047-2.193 0l-.073-.126c-.3-.527-.98-.714-1.507-.4l-1.153.66a1.272 1.272 0 0 0-.467 1.733c.607 1.04.113 1.893-1.093 1.893a1.27 1.27 0 0 0-1.267 1.267v1.173a1.27 1.27 0 0 0 1.267 1.267c1.206 0 1.7.853 1.093 1.9-.347.607-.14 1.38.467 1.727l1.153.66a1.113 1.113 0 0 0 1.52-.4l.073-.127c.6-1.047 1.587-1.047 2.194 0l.073.127c.313.526.993.713 1.52.4l1.153-.66a1.266 1.266 0 0 0 .467-1.727c-.607-1.047-.113-1.9 1.093-1.9a1.27 1.27 0 0 0 1.267-1.267V7.413a1.28 1.28 0 0 0-1.273-1.267ZM8 10.166A2.17 2.17 0 0 1 5.835 8a2.17 2.17 0 0 1 2.167-2.167A2.17 2.17 0 0 1 10.167 8a2.17 2.17 0 0 1-2.166 2.166Z"
    />
  </svg>
);
export const PasswordIcon = ({ active = false }) => (
  <svg width={16} height={16} fill="none">
    <path
      fill={active ? "#fff" : "#969CB0"}
      d="M8 11.566a1.087 1.087 0 1 0 0-2.173 1.087 1.087 0 0 0 0 2.173Z"
    />
    <path
      fill={active ? "#fff" : "#969CB0"}
      d="M12.187 6.354v-.833c0-1.8-.433-4.187-4.186-4.187-3.754 0-4.187 2.387-4.187 4.187v.833c-1.867.233-2.48 1.18-2.48 3.507v1.24c0 2.733.833 3.566 3.567 3.566h6.2c2.733 0 3.566-.833 3.566-3.566V9.86c0-2.327-.613-3.274-2.48-3.507Zm-4.186 6.14a2.016 2.016 0 0 1-2.014-2.013c0-1.114.907-2.014 2.014-2.014a2.02 2.02 0 0 1 2.013 2.014c0 1.113-.9 2.013-2.013 2.013Zm-3.1-6.2h-.154v-.773c0-1.954.554-3.254 3.254-3.254s3.253 1.3 3.253 3.254v.78H4.901v-.007Z"
    />
  </svg>
);
export const DeleteIcon = () => (
  <svg width={16} height={16} fill="none">
    <path
      fill="#FA4611"
      d="M14.047 3.487a74.21 74.21 0 0 0-3.227-.246v-.007l-.146-.867c-.1-.613-.247-1.533-1.807-1.533H7.12c-1.553 0-1.7.88-1.806 1.527l-.14.853c-.62.04-1.24.08-1.86.14l-1.36.133a.501.501 0 0 0-.454.547.497.497 0 0 0 .547.447l1.36-.134c3.493-.346 7.013-.213 10.547.14h.053a.505.505 0 0 0 .5-.453.51.51 0 0 0-.46-.547ZM12.82 5.426a.843.843 0 0 0-.607-.26H3.786a.832.832 0 0 0-.833.887l.413 6.84c.073 1.013.167 2.28 2.493 2.28h4.28c2.327 0 2.42-1.26 2.494-2.28l.413-6.834a.864.864 0 0 0-.227-.633Zm-3.714 6.407h-2.22a.504.504 0 0 1-.5-.5c0-.274.227-.5.5-.5h2.22c.273 0 .5.226.5.5 0 .273-.227.5-.5.5Zm.56-2.667H6.333a.504.504 0 0 1-.5-.5c0-.273.226-.5.5-.5h3.333c.273 0 .5.227.5.5s-.227.5-.5.5Z"
    />
  </svg>
);
