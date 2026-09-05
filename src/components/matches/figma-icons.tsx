import type { SVGProps } from "react";

function Icon({
  size,
  children,
  viewBox,
  ...props
}: SVGProps<SVGSVGElement> & { size: number; viewBox: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="block shrink-0"
      overflow="visible"
      {...props}
    >
      {children}
    </svg>
  );
}

export function SearchGlyph({ size = 20 }: { size?: number }) {
  return (
    <Icon size={size} viewBox="0 0 20 20">
      <path
        d="M9.16667 14.5833C12.1582 14.5833 14.5833 12.1582 14.5833 9.16667C14.5833 6.17512 12.1582 3.75 9.16667 3.75C6.17512 3.75 3.75 6.17512 3.75 9.16667C3.75 12.1582 6.17512 14.5833 9.16667 14.5833Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M13.3333 13.75L16.6667 17.0833"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </Icon>
  );
}

export function CalendarGlyph({ size = 20 }: { size?: number }) {
  return (
    <Icon size={size} viewBox="0 0 20 20">
      <path
        d="M15 5H5C4.07953 5 3.33333 5.74619 3.33333 6.66667V15C3.33333 15.9205 4.07953 16.6667 5 16.6667H15C15.9205 16.6667 16.6667 15.9205 16.6667 15V6.66667C16.6667 5.74619 15.9205 5 15 5Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M3.33333 8.33333H16.6667M6.66667 3.33333V6.66667M13.3333 3.33333V6.66667"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </Icon>
  );
}

export function FilterGlyph({ size = 20 }: { size?: number }) {
  return (
    <Icon size={size} viewBox="0 0 20 20">
      <path
        d="M4.16667 5.83333H15.8333M5.83333 10H14.1667M8.33333 14.1667H11.6667"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </Icon>
  );
}

export function BellGlyph({ size = 20 }: { size?: number }) {
  return (
    <Icon size={size} viewBox="0 0 20 20">
      <path
        d="M5 13.3333H15L14 11.5V8.33333C14 7.27247 13.5786 6.25505 12.8284 5.50491C12.0783 4.75476 11.0609 4.33333 10 4.33333C8.93913 4.33333 7.92172 4.75476 7.17157 5.50491C6.42143 6.25505 6 7.27247 6 8.33333V11.5L5 13.3333Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M8.33333 15C8.33333 15.442 8.50893 15.866 8.82149 16.1785C9.13405 16.4911 9.55797 16.6667 10 16.6667C10.442 16.6667 10.8659 16.4911 11.1785 16.1785C11.4911 15.866 11.6667 15.442 11.6667 15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </Icon>
  );
}

export function ChevronGlyph({ size = 16 }: { size?: number }) {
  return (
    <Icon size={size} viewBox="0 0 16 16">
      <path
        d="M4.66667 6.66667L8 10L11.3333 6.66667"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function ChevronDownGlyph({ size = 20 }: { size?: number }) {
  return (
    <Icon size={size} viewBox="0 0 20 20">
      <path
        d="M5.83333 8.33333L10 12.5L14.1667 8.33333"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

const TAB_GLYPH_STROKE = "#ffffff";

export function HomeTabGlyph() {
  return (
    <Icon size={24} viewBox="0 0 24 24" overflow="visible">
      <path
        d="M4 10.5L12 4L20 10.5V20C20 20.2652 19.8946 20.5196 19.7071 20.7071C19.5196 20.8946 19.2652 21 19 21H14V15H10V21H5C4.73478 21 4.48043 20.8946 4.29289 20.7071C4.10536 20.5196 4 20.2652 4 20V10.5"
        fill="none"
        stroke={TAB_GLYPH_STROKE}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function MatchesTabGlyph() {
  return (
    <Icon size={24} viewBox="0 0 24 24">
      <path
        d="M17.4 4H6.6C5.71634 4 5 4.71634 5 5.6V9.4C5 10.2837 5.71634 11 6.6 11H17.4C18.2837 11 19 10.2837 19 9.4V5.6C19 4.71634 18.2837 4 17.4 4Z"
        stroke={TAB_GLYPH_STROKE}
        strokeWidth="1.75"
        fill="none"
      />
      <path
        d="M17.4 13H6.6C5.71634 13 5 13.7163 5 14.6V18.4C5 19.2837 5.71634 20 6.6 20H17.4C18.2837 20 19 19.2837 19 18.4V14.6C19 13.7163 18.2837 13 17.4 13Z"
        stroke={TAB_GLYPH_STROKE}
        strokeWidth="1.75"
        fill="none"
      />
      <path
        d="M8.5 7.5H15.5M8.5 16.5H15.5"
        stroke={TAB_GLYPH_STROKE}
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
      />
    </Icon>
  );
}

export function NewsTabGlyph() {
  return (
    <Icon size={24} viewBox="0 0 24 24">
      <path
        d="M16.9 3.5H7.1C6.21634 3.5 5.5 4.21634 5.5 5.1V18.9C5.5 19.7837 6.21634 20.5 7.1 20.5H16.9C17.7837 20.5 18.5 19.7837 18.5 18.9V5.1C18.5 4.21634 17.7837 3.5 16.9 3.5Z"
        stroke={TAB_GLYPH_STROKE}
        strokeWidth="1.75"
        fill="none"
      />
      <path
        d="M8.5 8H15.5M8.5 11.5H15.5M8.5 15H13"
        stroke={TAB_GLYPH_STROKE}
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
      />
    </Icon>
  );
}

export function LeaguesTabGlyph() {
  return (
    <Icon size={24} viewBox="0 0 24 24">
      <path
        d="M8 5H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13C10.9391 13 9.92172 12.5786 9.17157 11.8284C8.42143 11.0783 8 10.0609 8 9V5Z"
        stroke={TAB_GLYPH_STROKE}
        strokeWidth="1.75"
        fill="none"
        strokeLinejoin="round"
      />
      <path
        d="M8 7H5.8C5.56169 7.40939 5.43113 7.87255 5.42056 8.34613C5.40998 8.81972 5.51973 9.28824 5.73953 9.70786C5.95933 10.1275 6.282 10.4845 6.67734 10.7454C7.07268 11.0064 7.52776 11.1628 8 11.2M16 7H18.2C18.4383 7.40939 18.5689 7.87255 18.5794 8.34613C18.59 8.81972 18.4803 9.28824 18.2605 9.70786C18.0407 10.1275 17.718 10.4845 17.3227 10.7454C16.9273 11.0064 16.4722 11.1628 16 11.2"
        stroke={TAB_GLYPH_STROKE}
        strokeWidth="1.75"
        fill="none"
      />
      <path
        d="M12 13V16M9 20H15M10.5 17H13.5"
        stroke={TAB_GLYPH_STROKE}
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
      />
    </Icon>
  );
}

export function FollowingTabGlyph() {
  return (
    <Icon size={24} viewBox="0 0 24 24">
      <path
        d="M12 20C12 20 6 15.65 6 11C6.01768 10.3111 6.22238 9.63994 6.59217 9.05841C6.96197 8.47689 7.48295 8.00687 8.09934 7.69867C8.71573 7.39048 9.40433 7.25571 10.0914 7.30879C10.7785 7.36186 11.4383 7.60079 12 8C12.5617 7.60079 13.2215 7.36186 13.9086 7.30879C14.5957 7.25571 15.2843 7.39048 15.9007 7.69867C16.5171 8.00687 17.038 8.47689 17.4078 9.05841C17.7776 9.63994 17.9823 10.3111 18 11C18 15.65 12 20 12 20Z"
        stroke={TAB_GLYPH_STROKE}
        strokeWidth="1.75"
        fill="none"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
